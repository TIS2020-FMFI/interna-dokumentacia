package upload_export_files

import (
	"fmt"
	"gorm.io/gorm/clause"
	"strings"
	conn "tisko/connection_database"
	"tisko/employee"
	h "tisko/helper"
)

func parseCards(pathName string) error{
	fileArray, err := h.ReadCsvFile(pathName)
	if err != nil {
		h.WriteErr(err)
		return err
	}
	return parseCardsFileArray(fileArray)
}

func parseCardsFileArray(array [][]string) error {
	var employees []employee.BasicEmployee

	anet, mapAnetToPassword := getAnetIdsMapAnetIdToCard(array)
	query := fmt.Sprint("anet_id in ('",anet, "')")
	err:= conn.Db.Model(&employees).Where(query).Find(&employees).Error
	if err != nil {
		h.WriteErr(err)
		return err
	}
	doUpages(employees, mapAnetToPassword)
	if len(employees)==0 {
		return fmt.Errorf("empty file")
	}
	err = conn.Db.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "id"}},
		DoUpdates: clause.AssignmentColumns([]string{"card"}),
	}).Create(&employees).Error
	return err
}

func getAnetIdsMapAnetIdToCard(array [][]string) (string, map[string]string) {
	anetIdArray := make([]string,0, len(array))
	myMap := make(map[string]string)
	for i := 0; i < len(array); i++ {
		row := array[i]
		anet := strings.TrimSpace(row[config.AnetIdCard-1])
		anetIdArray = append(anetIdArray, anet)
		myMap[anet]= strings.TrimSpace(row[config.NumberCard-1])
	}
	return strings.Join(anetIdArray, "', '"),myMap
}

func doUpages(employees []employee.BasicEmployee, mapAnetToPassword map[string]string) {
	for i := 0; i < len(employees); i++ {
		val, ok := mapAnetToPassword[employees[i].AnetId]
		if !ok {continue}
		employees[i].Card = val
	}
}
