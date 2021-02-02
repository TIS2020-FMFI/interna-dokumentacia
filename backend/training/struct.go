package training

import (
	"time"
)

type OnlineTraining struct {
	Id     uint       `gorm:"primaryKey" json:"id"`
	Name   string    `gorm:"column:name" json:"name"`
	Lector string    `gorm:"column:lector" json:"lector"`
	Date   time.Time `gorm:"column:date" json:"date"`
	Agenda string    `gorm:"column:agenda" json:"agenda"`
}
