package document

import (
	"encoding/json"
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
		sendAccept(id, writer)
	}
}

func sendAccept(id uint, writer http.ResponseWriter) {
	responseStruct := struct {
		status string
		id     uint
	}{"accept", id}
	con.HeaderSendOk(writer)
	_ = json.NewEncoder(writer).Encode(responseStruct)

}