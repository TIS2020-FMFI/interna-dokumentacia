package employee

import (
	"fmt"
	con "tisko/connection_database"
	path "tisko/paths"
)


type Employee struct {
	BasicEmployee
	Login        string `gorm:"column:login" json:"login"`
	Password     string `gorm:"column:password_allow.txt" json:"-"`
	Role         string `gorm:"column:role" json:"role"`
	Email        string `gorm:"column:email" json:"email"`
	JobTitle     string `gorm:"column:job_title" json:"job_title"`
	ManagerId    uint64    `gorm:"column:manager_id" json:"manager_id"`
	BranchId     uint64    `gorm:"column:branch_id" json:"branch_id"`
	DivisionId   uint64    `gorm:"column:division_id" json:"division_id"`
	DepartmentId uint64    `gorm:"column:department_id" json:"department_id"`
	CityId       uint64    `gorm:"column:city_id" json:"city_id"`
	Deleted      bool   `gorm:"column:deleted" json:"deleted"`
	ImportId     uint64    `gorm:"column:import_id" json:"import_id"`
}

type BasicEmployee struct {
	Id           uint64    `gorm:"primaryKey" json:"id"`
	FirstName    string `gorm:"column:first_name" json:"first_name"`
	LastName     string `gorm:"column:last_name" json:"last_name"`
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
