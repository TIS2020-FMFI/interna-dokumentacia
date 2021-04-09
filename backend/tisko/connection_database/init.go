package connection_database

import (
	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"time"
	h"tisko/helper"
)

var (
	Db       *gorm.DB
	myRouter *mux.Router
	homePageStringsMethod = make([]h.MyStrings, 0,20)
	startPart, endPart string
)

const dir = "./connection_database/"

func InitVars() {
	myRouter = mux.NewRouter().StrictSlash(true)
	dsn := h.ReturnTrimFile(dir+"postgres_config.txt")
	Db, _ = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if Db == nil {
		panic("nepripojene")
	}
	sqlDB, _ := Db.DB()
	sqlDB.SetMaxIdleConns(4967295 )
	sqlDB.SetMaxOpenConns(4967295)
	sqlDB.SetConnMaxLifetime(time.Minute/5)
	startPart= h.ReturnTrimFile(dir+"begin_homepage.txt")
	endPart= h.ReturnTrimFile(dir+"end_homepage.txt")
}
