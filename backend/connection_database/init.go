package connection_database

import (
	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"io/ioutil"
	"strings"
	"time"
)

func init() {
	myRouter = mux.NewRouter().StrictSlash(true)
	dsn := returnTrimFile("./config/postgres_config.txt")
	Db, _ = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if Db == nil {
		panic("nepripojene")
	}
	sqlDB, _ := Db.DB()
	sqlDB.SetMaxIdleConns(100)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)
}

func returnTrimFile(nameFile string) string {
	dat, err := ioutil.ReadFile(nameFile)
	check(err)
	return strings.TrimSpace(string(dat))
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
