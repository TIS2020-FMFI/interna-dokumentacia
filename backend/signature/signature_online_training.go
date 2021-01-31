package signature

import (
	"time"
)

type OnlineTrainingSignature struct {
	Id         uint       `gorm:"primaryKey" json:"id"`
	EmployeeId uint       `gorm:"column:employee_id" json:"employee_id"`
	TrainingId uint      `gorm:"column:training_id" json:"training_id"`
	Date    time.Time `gorm:"column:date" json:"date"`
}