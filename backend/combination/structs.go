package combination

import (
	con "tisko/connection_database"
	path "tisko/paths"
)

type Combination struct {
	BranchId     uint64    `json:"branch_id"`
	DivisionId   uint64    `json:"division_id"`
	DepartmentId uint64    `json:"department_id"`
	CityId       uint64    `json:"city_id"`
}
type CombinationFull struct {
	DivisionId uint64`gorm:"column:division_id" json:"division_id"`
	DivisionName string  `gorm:"column:division_name" json:"division_name"`

	DepartmentId uint64  `gorm:"column:department_id" json:"department_id"`
	DepartmentName string  `gorm:"column:department_name" json:"department_name"`

	CityId uint64  `gorm:"column:city_id" json:"city_id"`
	CityName string  `gorm:"column:city_name" json:"city_name"`

	BranchId uint64  `gorm:"column:branch_id" json:"branch_id"`
	BranchName string `gorm:"column:branch_name" json:"branch_name"`
}
func AddHandle() {
	con.AddHeaderGet(path.Comninations, sendAll)
}

