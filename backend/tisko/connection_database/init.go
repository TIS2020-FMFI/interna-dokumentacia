package connection_database

import (
	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	h "tisko/helper"
	"tisko/paths"
)

var (
	// Db global variable of connection to database
	Db       *gorm.DB
	// myRouter local variable of prepared *mux.Router
	myRouter *mux.Router
	// homePageStringsMethod local variable of prepared field to home page
	homePageStringsMethod = make([]h.MyStrings, 0,20)
	// startPart, endPart parts of home page
	startPart, endPart, dbConfig string
)

// dir local constant to load txt files
const dir = paths.GlobalDir +"connection_database/"

// InitVars init of variable myRouter, Db, startPart, endPart , WARNING: in can panic when do not found dir+"postgres_config.txt" or dir+"begin_homepage.txt" or dir+"end_homepage.txt"
func InitVars() {
	myRouter = mux.NewRouter().StrictSlash(true)
	dbConfig = h.ReturnTrimFile(dir+"postgres_config.txt")
	startPart= h.ReturnTrimFile(dir+"begin_homepage.txt")
	endPart= h.ReturnTrimFile(dir+"end_homepage.txt")
	err := createDbConnection()
	if err != nil {
		panic("unconnected: "+err.Error())
	}
}

func createDbConnection() error {
	con, err := gorm.Open(postgres.Open(dbConfig), &gorm.Config{})
	if err != nil {
		return err
	}
	sqlDB, _ := con.DB()
	sqlDB.SetMaxIdleConns(4967295)
	sqlDB.SetMaxOpenConns(4967295)
	Db=con
	return nil
}
