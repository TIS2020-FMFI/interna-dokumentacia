package document

import (
	"time"
	con "tisko/connection_database"
	path"tisko/paths"
)


type Document struct {
	Id           uint    `gorm:"primaryKey" json:"id"`
	Name          string    `gorm:"column:name" json:"name"`
	Link          string    `gorm:"column:link" json:"link"`
	Note          string    `gorm:"column:note" json:"note"`
	ReleaseDate   time.Time `gorm:"column:release_date" json:"release_date"`
	Deadline      time.Time `gorm:"column:deadline" json:"deadline"`
	OrderNumber   uint       `gorm:"column:order_number" json:"order_number"`
	Version       string    `gorm:"column:version" json:"version"`
	PrevVersionId uint       `gorm:"column:prev_version_id" json:"prev_version_id"`
	Assigned      string    `gorm:"column:assigned_to" json:"assigned_to"`
}

func AddHandle() {
	con.AddHeaderPost(path.DocumentAdd, createDoc)
}
