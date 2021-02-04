package fake_structs

import (
	"database/sql"
)

type OnlineTrainingSignature struct {
	Id         uint64       `gorm:"column:s_id" json:"id"`
	EmployeeId uint64       `gorm:"column:employee_id" json:"employee_id"`
	TrainingId uint64      `gorm:"column:training_id" json:"training_id"`
	Date    sql.NullTime  `gorm:"column:s_date" json:"date"`
}
type OnlineTraining struct {
	Id       uint64      `gorm:"column:t_id" json:"id"`
	Name     string    `gorm:"column:name" json:"name"`
	Lector   string    `gorm:"column:lector" json:"lector"`
	Agency   string    `gorm:"column:agency" json:"agency"`
	Place    string    `gorm:"column:place" json:"place"`
	Date     sql.NullTime `gorm:"column:on_date" json:"date"`
	Duration uint64      `gorm:"column:duration" json:"duration"`
	Agenda   string    `gorm:"column:agenda" json:"agenda"`
	Deadline sql.NullTime `gorm:"column:deadline" json:"deadline"`
}
