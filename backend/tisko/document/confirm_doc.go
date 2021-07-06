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


//confirmDoc handle for change edited to false according id from request
func confirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer tx.Rollback()
	if con.SetHeadersReturnIsContinue(writer, request) {
		const name = "confirmDoc"
		idString, ok := mux.Vars(request)["id"]
		if !ok {
			h.WriteErrWriteHandlers(fmt.Errorf("not found 'id'"), name, writer)
		}
		id, err := strconv.ParseUint(idString,10,64)
		if err != nil {
			h.WriteErrWriteHandlers(err, name, writer)
			return
		}
		err = doConfirm(id, tx)
		if err != nil {
			h.WriteErrWriteHandlers(err, name, writer)
			return
		}
		tx.Commit()
		con.SendAccept(id, writer)
	}
}

//doConfirm change edited to false according id
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
