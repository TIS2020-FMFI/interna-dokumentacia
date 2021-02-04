package helper

import (
	"gorm.io/gorm"
	"log"
	"net/http"
	"os"
)

func IfRecoverRollBack(tx *gorm.DB, writer http.ResponseWriter) {
	if r := recover(); r != nil {
		tx.Rollback()
		WriteErr(r)
	}
}

func WriteErr(r interface{}) {
	f, err := os.OpenFile("logfile", os.O_RDWR | os.O_CREATE | os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()
	log.SetOutput(f)
	log.Println(r)
}

