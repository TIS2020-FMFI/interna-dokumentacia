package document

import (
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func updateConfirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer tx.Rollback()
	if con.SetHeadersReturnIsContunue(writer, request) {
		doUpdate(writer, request, nil)
		ok, id := doUpdate(writer, request, nil)
		if !ok {
			return
		}
		err := doConfirm(id, tx)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		tx.Commit()
		con.SendAccept(id, writer)
	}
}