package training

import (
	"database/sql"
)

type OnlineTraining struct {
	Id       uint64       `gorm:"primaryKey" json:"id"`
	Name     string       `gorm:"column:name" json:"name"`
	Lector   string       `gorm:"column:lector" json:"lector"`
	Agency   string       `gorm:"column:agency" json:"agency"`
	Place    string       `gorm:"column:place" json:"place"`
	Date     sql.NullTime `gorm:"column:date" json:"date"`
	Duration uint64       `gorm:"column:duration" json:"duration"`
	Agenda   string       `gorm:"column:agenda" json:"agenda"`
	Deadline sql.NullTime `gorm:"column:deadline" json:"deadline"`
}
