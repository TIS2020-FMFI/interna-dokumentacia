package training

import (
	"database/sql"
	con "tisko/connection_database"
	h "tisko/helper"
	path "tisko/paths"
)

var (
	editedTraining string
)

func init() {
	editedTraining=h.ReturnTrimFile("./config/edited_training.txt")
}

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
	Edited          bool         `gorm:"column:edited" json:"-"`
	IdEmployees string `gorm:"column:unreleased_id_employees" json:"unreleased_id_employees"`
}
func AddHandleInitVars() {
	con.AddHeaderGet(path.EditedTraining, getEditedTrainings)
	con.AddHeaderPost(path.TrainingSave, createEditedTraining)
	con.AddHeaderPost(path.TrainingUpdate, updateEditedTraining)
}
