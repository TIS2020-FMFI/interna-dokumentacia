package document

import (
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func createConfirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer h.IfRecoverRollBack(tx, writer)
	if con.SetHeadersReturnIsContunue(writer, request) {
		id,ok := doCreate(writer, request, tx)
		if !ok {
			return
		}
		doConfirm(id, tx, writer)
		con.SendAccept(id, writer)
	}
}