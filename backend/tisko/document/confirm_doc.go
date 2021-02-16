package document

import (
	"fmt"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"strings"
	con "tisko/connection_database"
	h "tisko/helper"
)

func confirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer tx.Rollback()
	if con.SetHeadersReturnIsContunue(writer, request) {
		idString, ok := mux.Vars(request)["id"]
		if !ok {
			h.WriteErrWriteHaders(fmt.Errorf("not found 'id'"), writer)
		}
		id, err := strconv.ParseUint(idString,10,64)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		err = doConfirm(id, tx)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		tx.Commit()
		con.SendAccept(id, writer)
	}
}

func doConfirm(id uint64, tx *gorm.DB) (err error) {
	var respon h.StringsBool
	tmp := strings.ReplaceAll(confirm, "?", fmt.Sprint(id))
	re := tx.Raw(tmp).Find(&respon)
	err = re.Error
	if err != nil {
		return
	}
	return AddSignature(respon, id, tx)
}
