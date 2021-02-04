package training

import (
	"time"
)

type OnlineTraining struct {
	Id       uint      `gorm:"primaryKey" json:"id"`
	Name     string    `gorm:"column:name" json:"name"`
	Lector   string    `gorm:"column:lector" json:"lector"`
	Agency   string    `gorm:"column:agency" json:"agency"`
	Place    string    `gorm:"column:place" json:"place"`
	Date     time.Time `gorm:"column:date" json:"date"`
	Duration uint      `gorm:"column:duration" json:"duration"`
	Agenda   string    `gorm:"column:agenda" json:"agenda"`
}
