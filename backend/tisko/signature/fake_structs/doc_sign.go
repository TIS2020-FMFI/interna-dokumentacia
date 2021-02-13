package fake_structs

import (
	"database/sql"
)

type DocumentSignature struct {
	Id         uint64       `gorm:"column:d_s_id" json:"id"`
	EndDate    sql.NullTime `gorm:"column:e_date" json:"e_date"`
	StartDate  sql.NullTime `gorm:"column:s_date" json:"s_date"`
	EmployeeId uint64       `gorm:"column:e_d_s_id" json:"employee_id"`
	SuperiorId uint64       `gorm:"column:superior_id" json:"superior_id"`
	DocumentId uint64       `gorm:"column:document_id" json:"document_id"`
	Cancel   bool      `gorm:"column:cancel" json:"cancel"`
}
