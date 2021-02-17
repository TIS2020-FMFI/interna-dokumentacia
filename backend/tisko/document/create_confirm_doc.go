package document

import (
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func createConfirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer tx.Rollback()
	if con.SetHeadersReturnIsContunue(writer, request) {
		id,err := doCreate( request, tx)
		if err!=nil {
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