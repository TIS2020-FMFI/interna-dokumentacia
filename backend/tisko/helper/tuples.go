package helper

import (
	"fmt"
	"strings"
	"tisko02/helper"
)

type QueryThreeStrings struct {
	DocumentSignEmployee,
	OnlineSign,
	DocumentSign string
}

type MyStrings struct {
	First, Second, Query string
}

type StringsBool struct {
	AssignedTo      string `gorm:"column:assigned_to"`
	Name            string `gorm:"column:name"`
	Link            string `gorm:"column:link"`
	RequireSuperior bool   `gorm:"column:require_superior"`
}

type NewEmployee struct {
	Id uint64`json:"id"`
	SuperiorId uint64`json:"superior_id"`
	Assigned string`json:"assigned_to"`
}

func GetIdsNewEmployeesSQLStringArray(newEmployees []NewEmployee) string {
	ids := make([]uint64,0,len(newEmployees))
	for i := 0; i < len(newEmployees); i++ {
		ids = append(ids, newEmployees[i].Id)
	}
	return fmt.Sprint("array[", helper.ArrayUint64ToString(ids,","),"]")
}
func GetIdsSuperiorNewEmployeesSQLStringArray(newEmployees []NewEmployee) string {
	idsSuperior := make([]uint64,0,len(newEmployees))
	for i := 0; i < len(newEmployees); i++ {
		idsSuperior = append(idsSuperior, newEmployees[i].SuperiorId)
	}
	return fmt.Sprint("array[", helper.ArrayUint64ToString(idsSuperior,","),"]")

}
func GetNewAssignedToEmployeesSQLStringArray(newEmployees []NewEmployee) string {
	assigneds := make([]string,0,len(newEmployees))
	for i := 0; i < len(newEmployees); i++ {
		assigneds = append(assigneds, newEmployees[i].Assigned)
	}
	return fmt.Sprint("array[", strings.Join(assigneds,","),"]")

}