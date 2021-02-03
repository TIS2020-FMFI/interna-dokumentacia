package signature

import (
	"time"
	con "tisko/connection_database"
	path "tisko/paths"
)

type DocumentSignature struct {
	Id         uint       `gorm:"primaryKey" json:"id"`
	EndDate    time.Time `gorm:"column:e_date" json:"e_date"`
	StartDate  time.Time `gorm:"column:s_date" json:"s_date"`
	Training   bool      `gorm:"column:training" json:"training"`
	EmployeeId uint       `gorm:"column:employee_id" json:"employee_id"`
	SuperiorId uint       `gorm:"column:superior_id" json:"superior_id"`
	DocumentId uint       `gorm:"column:document_id" json:"document_id"`
}

func AddHandle() {
	con.AddHeaderGetID(path.UnsignedSigns, GetUnsignedSignatures)
	con.AddHeaderGetID(path.SkillMatrix, GetSkillMatrix)
}