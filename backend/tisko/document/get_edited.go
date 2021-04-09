package document

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func getEditedDoc(writer http.ResponseWriter, request *http.Request) {
	sendDocByQuery(editedDoc, h.RquestWriter{
		W: writer,
		R: request,
	})
}

func sendDocByQuery(query string, rw h.RquestWriter) {
	if con.SetHeadersReturnIsContinue(rw.W, rw.R) {
		var docs []Document
		re := con.Db.Raw(query).Find(&docs)
		if docs == nil {
			h.WriteErrWriteHaders(re.Error, rw.W)
			return
		}
		con.HeaderSendOk(rw.W)
		_ = json.NewEncoder(rw.W).Encode(docs)
	}
}
