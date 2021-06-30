package signature

import (
	"fmt"
	"gorm.io/gorm"
	"strings"
	"tisko/helper"
	h "tisko/helper"
)

// AddSignsNewEmployeesReturnsEmails create records about signatures in database according  newEmployees []h.NewEmployee
//  - return strings-mails
func AddSignsNewEmployeesReturnsEmails(newEmployees []h.NewEmployee, tx *gorm.DB) ([]string, error) {
	var (
		result []h.Mail
		sql = prepareSqlNewEmployeesSigns(newEmployees)
	)
	re := tx.Raw(sql).Find(&result)
	if re.Error != nil {
		h.WriteErr(re.Error)
		return nil, fmt.Errorf(re.Error.Error())
	}
	return convert(result), nil
}

//convert extract strings from my structure
func convert(result []h.Mail) []string {
	email := make([]string,0,len(result))
	for i := 0; i < len(result); i++ {
		temp := result[i].Mail
		if len(temp)==0 {
			continue
		}
		email = append(email, temp )
	}
	return email
}

//prepareSqlNewEmployeesSigns run SQL function with arguments from newEmployees []h.NewEmployee
func prepareSqlNewEmployeesSigns(newEmployees []h.NewEmployee) string {
	sql := newEmployeesQuery
	sql= strings.ReplaceAll(sql, "ArrayId", GetIdsNewEmployeesSQLStringArray(newEmployees))
	sql= strings.ReplaceAll(sql, "ArraySuperiorId", GetIdsSuperiorNewEmployeesSQLStringArray(newEmployees))
	sql= strings.ReplaceAll(sql, "ArrayAssignedTo", GetNewAssignedToEmployeesSQLStringArray(newEmployees))
	sql= strings.ReplaceAll(sql, "Length", fmt.Sprint(len(newEmployees)))
	return sql
}

// GetIdsNewEmployeesSQLStringArray extract Ids and format to "array[" + join(ids, ",") + "]"
func GetIdsNewEmployeesSQLStringArray(newEmployees []h.NewEmployee) string {
	ids := make([]uint64,0,len(newEmployees))
	for i := 0; i < len(newEmployees); i++ {
		ids = append(ids, newEmployees[i].Id)
	}
	return fmt.Sprint("array[", helper.ArrayUint64ToString(ids,","),"]")
}

// GetIdsSuperiorNewEmployeesSQLStringArray extract SuperiorIds and format to "array[" + join(SuperiorIds, ",") + "]"
func GetIdsSuperiorNewEmployeesSQLStringArray(newEmployees []h.NewEmployee) string {
	idsSuperior := make([]uint64,0,len(newEmployees))
	for i := 0; i < len(newEmployees); i++ {
		idsSuperior = append(idsSuperior, newEmployees[i].SuperiorId)
	}
	return fmt.Sprint("array[", helper.ArrayUint64ToString(idsSuperior,","),"]")

}

// GetNewAssignedToEmployeesSQLStringArray extract Assigneds and format to "array[" + join(Assigneds, ",") + "]"
func GetNewAssignedToEmployeesSQLStringArray(newEmployees []h.NewEmployee) string {
	assigneds := make([]string,0,len(newEmployees))
	for i := 0; i < len(newEmployees); i++ {
		assigneds = append(assigneds, fmt.Sprint("'", newEmployees[i].Assigned, "'"))
	}
	return fmt.Sprint("array[", strings.Join(assigneds,", "),"]")

}