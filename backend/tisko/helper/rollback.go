package helper

import (
	"fmt"
	"gorm.io/gorm"
	"net/http"
)

func IfRecoverRollBack(tx *gorm.DB, writer http.ResponseWriter) {
	if r := recover(); r != nil {
		http.Error(writer, fmt.Sprint("err: ", r), http.StatusInternalServerError)
		tx.Rollback()
		WriteErr(r)
	}
}
