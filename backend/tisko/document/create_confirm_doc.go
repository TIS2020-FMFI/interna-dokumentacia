package document

import (
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

//createConfirmDoc handle for create document and set edited = false
func createConfirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer tx.Rollback()
	if con.SetHeadersReturnIsContinue(writer, request) {
		id,err := doCreate( request, tx)
		if err!=nil {
			h.WriteErrWriteHandlers(err, writer)
			return
		}
		err = doConfirm(id, tx)
		if err != nil {
			h.WriteErrWriteHandlers(err, writer)
			return
		}
		tx.Commit()
		con.SendAccept(id, writer)
	}
}