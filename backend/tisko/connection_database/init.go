package connection_database

import (
	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"time"
	h"tisko/helper"
)

func Init0() {
	myRouter = mux.NewRouter().StrictSlash(true)
	dsn := h.ReturnTrimFile("./config/postgres_config.txt")
	Db, _ = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if Db == nil {
		panic("nepripojene")
	}
	sqlDB, _ := Db.DB()
	sqlDB.SetMaxIdleConns(100)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)
}
