package connection_database

import (
	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"time"
	h"tisko/helper"
)

var (
	// Db global variable of connection to database
	Db       *gorm.DB
	// myRouter local variable of prepared *mux.Router
	myRouter *mux.Router
	// homePageStringsMethod local variable of prepared field to home page
	homePageStringsMethod = make([]h.MyStrings, 0,20)
	// startPart, endPart parts of home page
	startPart, endPart string
)

// dir local constant to load txt files
const dir = "./connection_database/"

// InitVars init of variable myRouter, Db, startPart, endPart , WARNING: in can panic when do not found dir+"postgres_config.txt" or dir+"begin_homepage.txt" or dir+"end_homepage.txt"
func InitVars() {
	myRouter = mux.NewRouter().StrictSlash(true)
	dsn := h.ReturnTrimFile(dir+"postgres_config.txt")
	Db, _ = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if Db == nil {
		panic("nepripojene")
	}
	sqlDB, _ := Db.DB()
	sqlDB.SetMaxIdleConns(4967295)
	sqlDB.SetMaxOpenConns(4967295)
	sqlDB.SetConnMaxLifetime(time.Minute/5)
	startPart= h.ReturnTrimFile(dir+"begin_homepage.txt")
	endPart= h.ReturnTrimFile(dir+"end_homepage.txt")
}
