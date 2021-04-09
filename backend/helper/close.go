package helper

import (
	"fmt"
	"gorm.io/gorm"
	"net/http"
	"os"
)

func IfRecoverRollBack(tx *gorm.DB, writer http.ResponseWriter) {
	if r := recover(); r != nil {
		http.Error(writer, fmt.Sprint("err: ", r), http.StatusInternalServerError)
		tx.Rollback()
		WriteErr(r)
	}
}

func MyCloseFileIfExist(f *os.File) {
	if f != nil {
		f.Close()
	}
}