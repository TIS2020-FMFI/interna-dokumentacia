package signature

import (
	"database/sql"
	con "tisko/connection_database"
	path "tisko/paths"
)

type DocumentSignature struct {
	Id         uint64       `gorm:"primaryKey" json:"id"`
	EndDate    sql.NullTime `gorm:"column:e_date" json:"e_date"`
	StartDate  sql.NullTime `gorm:"column:s_date" json:"s_date"`
	EmployeeId uint64       `gorm:"column:employee_id" json:"employee_id"`
	SuperiorId uint64       `gorm:"column:superior_id" json:"superior_id"`
	DocumentId uint64       `gorm:"column:document_id" json:"document_id"`
	Cancel   bool      `gorm:"column:cancel" json:"cancel"`
}

func AddHandleInitVars() {
	init0()
	con.AddHeaderGetID(path.UnsignedSigns, getUnsignedSignatures)
	con.AddHeaderGetID(path.SignedSigns, getSignedSignatures)
	con.AddHeaderGetID(path.SkillMatrix, getSkillMatrix)
	con.AddHeaderPost(path.Sign, sign)
	con.AddHeaderPost(path.SignSuperior, signSuperior)
	con.AddHeaderPost(path.SignTraining, signTraining)
	con.AddHeaderPost(path.TrainingUpdateConfirm, updateConfirm)
	con.AddHeaderPost(path.CancelsResigns, cancelResigns)
	con.AddHeaderGetID(path.TrainingConfirm, confirm)
}