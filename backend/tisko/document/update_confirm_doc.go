package document

import (
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func updateConfirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer tx.Rollback()
	if con.SetHeadersReturnIsContinue(writer, request) {
		ok, id := doUpdate(writer, request, tx)
		if !ok {
			return
		}
		err := doConfirm(id, tx)
		if err != nil {
			h.WriteErrWriteHandlers(err, "updateConfirmDoc", writer)
			return
		}
		tx.Commit()
		con.SendAccept(id, writer)
	}
}