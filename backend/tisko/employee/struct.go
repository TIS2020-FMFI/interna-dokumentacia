package employee

import (
	"fmt"
	con "tisko/connection_database"
	path "tisko/paths"
)

type Employee struct {
	BasicEmployee
	ManagerId    uint64 `gorm:"column:manager_id" sql:"type:VARCHAR(5) CHARACTER SET utf8 COLLATE utf8_general_ci" json:"manager_id,omitempty"`
	BranchId     uint64 `gorm:"column:branch_id" json:"branch_id,omitempty"`
	DivisionId   uint64 `gorm:"column:division_id" json:"division_id,omitempty"`
	CityId       uint64 `gorm:"column:city_id" json:"city_id,omitempty"`
	Deleted      bool   `gorm:"column:deleted" json:"deleted,omitempty"`
	ImportId     uint64 `gorm:"column:import_id" json:"import_id,omitempty"`
	Login        string `gorm:"column:login" json:"login,omitempty"`
	Password     string `gorm:"column:password" json:"-"`
	Role         string `gorm:"column:role" json:"role,omitempty"`
	Email        string `gorm:"column:email" json:"email,omitempty"`
	JobTitle     string `gorm:"column:job_title" json:"job_title,omitempty"`
	DepartmentId uint64 `gorm:"column:department_id" json:"department_id,omitempty"`
}

type BasicEmployee struct {
	Id        uint64 `gorm:"primaryKey" json:"id"`
	FirstName string `gorm:"column:first_name" json:"first_name"`
	LastName  string `gorm:"column:last_name" sql:"CHARACTER SET win1250 COLLATE " json:"last_name"`
	AnetId    string `gorm:"column:anet_id" json:"anet_id"`
	Card      string `gorm:"column:card" json:"-"`
}

func (BasicEmployee) TableName() string {
	return "employees"
}
func AddHandleInitVars() {
	init0()
	con.AddHeaderPost(path.Login, login)
	con.AddHeaderPost(path.Kiosk, kiosk)
	con.AddHeaderGet(path.AllEmployees, getAll)
	con.AddHeaderGet(fmt.Sprint(path.FilterEmployees, "/{filter}"), getFiltered)
}
func NewEmptyEmployee() Employee {
	return Employee{
		BasicEmployee: BasicEmployee{
			FirstName: "",
			LastName:  "",
			AnetId:    "",
			Card:      "",
		},
		ManagerId:    0,
		DepartmentId: 0,
		BranchId:     0,
		DivisionId:   0,
		CityId:       0,
		Deleted:      false,
		ImportId:     0,
		Login:        "",
		Password:     "",
		Role:         "",
		Email:        "",
		JobTitle:     "",
	}
}
