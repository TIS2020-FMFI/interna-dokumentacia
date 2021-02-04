package document

import (
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func updateConfirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer h.IfRecoverRollBack(tx, writer)
	if con.SetHeadersReturnIsContunue(writer, request) {
		doUpdate(writer, request, nil)
		ok, id := doUpdate(writer, request, nil)
		if !ok {
			return
		}
		doConfirm(id, tx, writer)
		con.SendAccept(id, writer)
	}
}