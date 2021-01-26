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
	dsn := loadFromConfig()
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
func check(e error) {
	if e != nil {
		panic(e)
	}
}
func loadFromConfig() string {
	dat, err := ioutil.ReadFile("./config/postgres_config.txt")
	check(err)
	return strings.TrimSpace(string(dat))
}

func main() {
	http.HandleFunc("/login", login)
	_ = http.ListenAndServe(":3000", nil)
}

