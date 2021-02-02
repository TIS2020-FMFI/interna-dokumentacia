package helper_func

import (
	"gorm.io/gorm"
	"log"
	"os"
)

func IfRecoverRollBack(tx *gorm.DB) {
	if r := recover(); r != nil {
		tx.Rollback()
		writeErr(r)
	}
}

func writeErr(r interface{}) {
	f, err := os.OpenFile("logfile", os.O_RDWR | os.O_CREATE | os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()
	log.SetOutput(f)
	log.Println(r)
}
