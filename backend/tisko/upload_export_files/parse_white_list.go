package upload_export_files

import (
	"fmt"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"path/filepath"
	"strings"
	"sync"
	con "tisko/connection_database"
	"tisko/employee"
	h "tisko/helper"
	"tisko/mail"
	"tisko/signature"
)

//parseSaveEmployeesAddSign add employees to database and add them signatures
func parseSaveEmployeesAddSign(dir string, name string) error {
	tx := con.Db.Begin()
	defer tx.Rollback()
	newEmployees, err := parseReadFileCareImportInDBSaveEmployeesReturnNew(dir, name, tx)
	if err != nil {
		h.WriteErr(err)
		return err
	}
	if len(newEmployees) == 0 {
		return nil
	}
	emailsEmployees, err0 := signature.AddSignsNewEmployeesReturnsEmails(newEmployees, tx)
	if err0 != nil {
		h.WriteErr(err0)
		return err
	}
	err = tx.Commit().Error
	if err != nil {
		return err
	}
	go mail.SendWelcome(emailsEmployees)
	return nil
}

//parseReadFileCareImportInDBSaveEmployeesReturnNew read csv, write to database and return []h.NewEmployee or error
func parseReadFileCareImportInDBSaveEmployeesReturnNew(path string, name string, tx *gorm.DB) ([]h.NewEmployee, error) {
	fileArray, err := h.ReadCsvFile(filepath.Join(path, name))
	if err != nil {
		return nil, err
	}
	id, err := getImportId(name, tx)
	if err != nil {
		return nil, err
	}
	return parseArraySaveAllEmployeesReturnNew(filterEmptyName(fileArray), id, tx)
}

//filterEmptyName ignore rows with empty column for first name
func filterEmptyName(array [][]string) [][]string {
	result := make([][]string, 0, len(array))
	for i := 0; i < len(array); i++ {
		if len(array[i][config.FirstName-1]) == 0 {
			continue
		}
		result = append(result, array[i])
	}
	return result
}

//parseArraySaveAllEmployeesReturnNew prepare all for saved to database and run it
func parseArraySaveAllEmployeesReturnNew(fileArray [][]string, id uint64, tx *gorm.DB) ([]h.NewEmployee, error) {
	ch, mapAllEmployeesFromLastImport := makeChanSendingEmployeesGetLastImport(fileArray, id, tx)
	createEmployees, updateEmployees := catchEmployees(len(fileArray), ch)
	createOrUpdateFunc := prepareCreateOrUpdate(createEmployees, updateEmployees)
	return createOrUpdateFunc(mapAllEmployeesFromLastImport, tx)
}

//makeChanSendingEmployeesGetLastImport check all employees from last import end run parallel creating structs of employee.Employee,
//return chan for these structs and map of anetId and id
func makeChanSendingEmployeesGetLastImport(fileArray [][]string, id uint64, tx *gorm.DB) (chan *employee.Employee, map[string]uint64) {
	ch, mapAllEmployeesFromLastImport := make(chan *employee.Employee), getMapAllEmployeesFromLastImport(id)
	banchMap, cityMap, departmentMap, divisionMap, superiorMap := getMapsIdFromImportDb(fileArray, tx)
	for i := 0; i < len(fileArray); i++ {
		go func(row []string) {
			tempEmployee, ok := employee.NewEmptyEmployee(), false
			tempEmployee.ImportId, tempEmployee.Deleted = id, false
			ok = setGeneralIdFromStringIfExist(&mapAllEmployeesFromLastImport, func(id uint64) { tempEmployee.Id = id }, row[config.AnetId-1]) || ok
			ok = setGeneralIdFromStringIfExist(&banchMap, func(id uint64) { tempEmployee.BranchId = id }, row[config.Branch-1]) || ok
			ok = setGeneralIdFromStringIfExist(&cityMap, func(id uint64) { tempEmployee.CityId = id }, row[config.City-1]) || ok
			ok = setGeneralIdFromStringIfExist(&departmentMap, func(id uint64) { tempEmployee.DepartmentId = id }, row[config.Department-1]) || ok
			ok = setGeneralIdFromStringIfExist(&divisionMap, func(id uint64) { tempEmployee.DivisionId = id }, row[config.Division-1]) || ok
			ok = setGeneralIdFromStringIfExist(&superiorMap, func(id uint64) { tempEmployee.ManagerId = id }, row[config.Manager-1]) || ok
			if !ok {
				h.WriteMassageAsError("at import Ids(branch, city, ............) ")
			}
			setStrings(row, &tempEmployee)
			ch <- &tempEmployee
		}(fileArray[i])
	}
	return ch, mapAllEmployeesFromLastImport
}

//catchEmployees collect employee.Employee from ch chan (and set attribute "deleted" to false), return:
//  - createEmployees: employees for create in database
//  - updateEmployees: employees for update in database
func catchEmployees(lenght int, ch chan* employee.Employee) ([]*employee.Employee, []*employee.Employee) {
	updateEmployees := make([]*employee.Employee, 0, lenght)
	createEmployees := make([]*employee.Employee, 0, lenght)
	for i := 0; i < lenght; i++ {
		tempEmployee := <-ch
		tempEmployee.Deleted = false
		if tempEmployee.Id == 0 {
			createEmployees = append(createEmployees, tempEmployee)
		} else {
			updateEmployees = append(updateEmployees, tempEmployee)
		}
	}
	return createEmployees, updateEmployees
}

func setStrings(row []string, e *employee.Employee) {
	e.FirstName = row[config.FirstName-1]
	e.LastName = row[config.LastName-1]
	e.AnetId = row[config.AnetId-1]
	e.Login = row[config.Login-1]
	e.Password = row[config.Password-1]
	e.Role = row[config.Role-1]
	e.Email = row[config.Email-1]
	e.JobTitle = row[config.JobTitle-1]
}

//prepareCreateOrUpdate Middleware for prepare/return func to update old and create new record in database
func prepareCreateOrUpdate(create []*employee.Employee, update []*employee.Employee) func(lastImport map[string]uint64, tx *gorm.DB) ([]h.NewEmployee, error) {
	common := append(update, create...)
	return func(lastImport map[string]uint64, tx *gorm.DB) ([]h.NewEmployee, error) {
		var err, err2 error
		if len(lastImport) > 0 {
			err2 = tx.Model(&employee.Employee{}).
				Select("deleted").Where(buildWhere(lastImport)).
				Update("deleted", true).Error
			if err2 != nil {
				h.WriteErr(err2)
			}
		}
		columns := []string{
			"deleted", "first_name", "last_name",
			"login", "role", "email",
			"job_title", "manager_id", "branch_id",
			"division_id", "department_id", "city_id",
			"import_id", "anet_id", "password"}
		tx.Statement.AddClause(clause.OnConflict{
			Columns:   []clause.Column{{Name: "id"}},
			DoUpdates: clause.AssignmentColumns(columns),
		})
		tx.Statement.AddClause(clause.OnConflict{
			Columns:   []clause.Column{{Name: "anet_id"}},
			DoUpdates: clause.AssignmentColumns(columns),
		})
		err = tx.Create(&common).Error
		if err != nil {
			return nil, fmt.Errorf("%v", err)
		}
		return employee.ConvertToNewEmployees(create), nil
	}
}

// buildWhere from map fetch Ids and make string-SQL condition "anet_id in ('"+join(ids,", ")+")"
func buildWhere(lastImport map[string]uint64) string {
	array := make([]string, 0, len(lastImport))

	for k := range lastImport {
		array = append(array, k)
	}
	return fmt.Sprint("anet_id in ('", strings.Join(array, "', '"), "')")
}

//setGeneralIdFromStringIfExist if string s is in dataMap run function f
func setGeneralIdFromStringIfExist(dataMap *map[string]uint64, f func(id uint64), s string) bool {
	id, ok := (*dataMap)[s]
	if ok {
		f(id)
	}
	return ok
}

//getMapAllEmployeesFromLastImport crate map with anetId like key and database id like value
func getMapAllEmployeesFromLastImport(id uint64) map[string]uint64 {
	query := employeesSelectByImport
	query = strings.ReplaceAll(query, "MyId", fmt.Sprint(id))
	result := make(map[string]uint64)
	employeeAllByImportId, err := employee.GetBasicEmployeesByQuery(query)
	if err != nil {
		return result
	}
	for i := 0; i < len(employeeAllByImportId); i++ {
		emp := employeeAllByImportId[i]
		result[emp.AnetId] = emp.Id
	}
	return result
}

//getMapsIdFromImportDb create 5 map to mapping rows strings to id, it make for "branches", "cities", "departments", "divisions" and managers
func getMapsIdFromImportDb(array [][]string, tx *gorm.DB) (map[string]uint64, map[string]uint64, map[string]uint64, map[string]uint64, map[string]uint64) {
	banchMap, cityMap, departmentMap, divisionMap, superiorMap := make(map[string]uint64),
		make(map[string]uint64), make(map[string]uint64), make(map[string]uint64), make(map[string]uint64)
	for i := 0; i < len(array); i++ {
		row := array[i]
		banchMap[row[config.Branch-1]] = 0
		cityMap[row[config.City-1]] = 0
		departmentMap[row[config.Department-1]] = 0
		divisionMap[row[config.Division-1]] = 0
		superiorMap[row[config.Manager-1]] = 0
	}
	ch := make(chan bool)
	mux := &sync.Mutex{}
	fnFethIdForMap := prepareFethIdForMap(ch, tx, mux)
	go fnFethIdForMap(banchMap, "branches")
	go fnFethIdForMap(cityMap, "cities")
	go fnFethIdForMap(departmentMap, "departments")
	go fnFethIdForMap(divisionMap, "divisions")
	go func() { fetchIdManager(superiorMap, tx, mux); ch <- true }()
	h.Synchronize(ch, 5)
	return banchMap, cityMap, departmentMap, divisionMap, superiorMap
}

//fetchIdManager fill map with tuples (anetId and id)
func fetchIdManager(superiorMap map[string]uint64, tx *gorm.DB, mux *sync.Mutex) {
	array := getArrayOfKeys(superiorMap)
	Query := fmt.Sprint(employeesIdAnetId)
	Query = strings.ReplaceAll(Query, "Query",
		fmt.Sprint("('", strings.Join(array, "', '"), "')"))
	fn := prepareFillMapByResultQuery(mux, tx)
	fn(superiorMap, Query)
}

//prepareFethIdForMap Middleware for prepare/return func to fill map according table
func prepareFethIdForMap(ch chan bool, tx *gorm.DB, mux *sync.Mutex) func(mapId map[string]uint64, table string) {
	return func(mapId map[string]uint64, table string) {
		array := getArrayOfKeys(mapId)
		importIdQuery := fmt.Sprint(insertSelectIdByName)
		importIdQuery = strings.ReplaceAll(importIdQuery, "NameTable",
			fmt.Sprint("\"", table, "\""))
		arrayJoin := strings.Join(array, "', '")
		importIdQuery = strings.Replace(importIdQuery, "MyInseredName",
			fmt.Sprintf(" any (array['%v'])", arrayJoin), 1)
		importIdQuery = strings.ReplaceAll(importIdQuery, "MyInseredName",
			fmt.Sprintf("* from\n unnest(ARRAY['%v'])", arrayJoin))
		fn := prepareFillMapByResultQuery(mux, tx)
		fn(mapId, importIdQuery)
		ch <- true
	}
}

//prepareFillMapByResultQuery Middleware for prepare/return func to fill map according query
func prepareFillMapByResultQuery(mux *sync.Mutex, tx *gorm.DB) func(mapId map[string]uint64, query string) {
	return func(mapId map[string]uint64, query string) {
		var idName []h.NameId
		mux.Lock()
		err := tx.Raw(query).First(&idName).Error
		mux.Unlock()
		if err != nil {
			h.WriteErr(err)
		} else {
			for i := 0; i < len(idName); i++ {
				one := idName[i]
				mapId[one.Name] = one.Id
			}
		}

	}
}

//getArrayOfKeys get strings array of keys
func getArrayOfKeys(mapId map[string]uint64) []string {
	array := make([]string, 0, len(mapId))
	for key := range mapId {
		array = append(array, key)
	}
	return array
}

// getImportId take name X.Y.Z.csv and run fethIdByNameFromDb to search id for X.Y.Z
func getImportId(name string, tx *gorm.DB) (uint64, error) {
	array := strings.Split(name, ".")
	if len(array) < 2 {
		return 0, fmt.Errorf("untaped - unsiutable name")
	}
	arrayJoin := strings.Join(array[:len(array)-1], ".")
	return fethIdByNameFromDb(arrayJoin, tx)
}

// fethIdByNameFromDb search id by name, if do not exist create(this function provide SQL command in importIdQuery)
func fethIdByNameFromDb(importName string, tx *gorm.DB) (uint64, error) {
	importIdQuery := fmt.Sprint(insertSelectIdByName)
	importIdQuery = strings.ReplaceAll(importIdQuery, "NameTable", "\"imports\"")
	prepareName := fmt.Sprintf("'%v'", importName)
	importIdQuery = strings.ReplaceAll(importIdQuery, "MyInseredName", prepareName)
	importIdQuery = strings.ReplaceAll(importIdQuery, "as insertMy", "")
	importIdQuery = strings.ReplaceAll(importIdQuery, "insertMy", prepareName)
	var id h.NameId
	result := tx.Raw(importIdQuery).First(&id)
	if result.Error != nil {
		return 0, result.Error
	}
	return id.Id, nil
}
