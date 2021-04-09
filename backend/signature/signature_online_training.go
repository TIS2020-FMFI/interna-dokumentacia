package signature

import (
	"database/sql"
)

type OnlineTrainingSignature struct {
	Id         uint64       `gorm:"primaryKey" json:"id"`
	EmployeeId uint64       `gorm:"column:employee_id" json:"employee_id"`
	TrainingId uint64      `gorm:"column:training_id" json:"training_id"`
	Date     sql.NullTime `gorm:"column:date" json:"date"`
}
