package employee

import (
	con "tisko/connection_database"
	path"tisko/paths"
)


type Employee struct {
	Id           uint    `gorm:"primaryKey" json:"id"`
	FirstName    string `gorm:"column:first_name" json:"first_name"`
	LastName     string `gorm:"column:last_name" json:"last_name"`
	Login        string `gorm:"column:login" json:"login"`
	Password     string `gorm:"column:password" json:"-"`
	Role         string `gorm:"column:role" json:"role"`
	Email        string `gorm:"column:email" json:"email"`
	JobTitle     string `gorm:"column:job_title" json:"job_title"`
	ManagerId    uint    `gorm:"column:manager_id" json:"manager_id"`
	BranchId     uint    `gorm:"column:branch_id" json:"branch_id"`
	DivisionId   uint    `gorm:"column:division_id" json:"division_id"`
	DepartmentId uint    `gorm:"column:department_id" json:"department_id"`
	CityId       uint    `gorm:"column:city_id" json:"city_id"`
	Deleted      bool   `gorm:"column:deleted" json:"deleted"`
	ImportId     uint    `gorm:"column:import_id" json:"import_id"`
}

func AddHandle() {
	con.AddHeaderPost(path.Login, login)
	con.AddHeaderPost(path.Kiosk, kiosk)
}
