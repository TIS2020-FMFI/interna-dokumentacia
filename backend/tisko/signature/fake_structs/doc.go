package fake_structs

import (
	"database/sql"
)

type Document struct {
	Id            uint64      `gorm:"column:d_id" json:"id"`
	Name            string    `gorm:"column:name" json:"name"`
	Link            string    `gorm:"column:link" json:"link"`
	Note            string    `gorm:"column:note" json:"note"`
	ReleaseDate     sql.NullTime `gorm:"column:release_date" json:"release_date"`
	Deadline        sql.NullTime `gorm:"column:deadline" json:"deadline"`
	OrderNumber     uint64      `gorm:"column:order_number" json:"order_number"`
	Version         string    `gorm:"column:version" json:"version"`
	PrevVersionId   uint64      `gorm:"column:prev_version_id" json:"prev_version_id"`
	Assigned        string    `gorm:"column:assigned_to" json:"assigned_to"`
	RequireSuperior bool      `gorm:"column:require_superior" json:"require_superior"`
	Edited          bool      `gorm:"column:edited" json:"-"`
}
