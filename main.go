package main

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"io/ioutil"
	"net/http"
	"strings"
	"time"
)

var (
	db *gorm.DB
)

func init() {
	dsn := returnTrimFile("./config/postgres_config.txt")
	db, _ = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if db==nil{
		panic("nepripojene")
	}
	sqlDB, _ := db.DB()
	// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
	sqlDB.SetMaxIdleConns(100)
	// SetMaxOpenConns sets the maximum number of open connections to the database.
	sqlDB.SetMaxOpenConns(100)
	// SetConnMaxLifetime sets the maximum amount of time a connection may be reused.
	sqlDB.SetConnMaxLifetime(time.Hour)

}
func main() {
	http.HandleFunc("/login", login)
	_ = http.ListenAndServe(returnTrimFile("./config/port.txt"), nil)
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func returnTrimFile(nameFile string) string {
	dat, err := ioutil.ReadFile(nameFile)
	check(err)
	return strings.TrimSpace(string(dat))
}
