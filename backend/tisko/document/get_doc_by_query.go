package document

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func sendDocByQuery(query string, rw h.RquestWriter) {
	if con.SetHeadersReturnIsContunue(rw.W, rw.R) {
		var docs []Document
		con.Db.Raw(query).Find(&docs)
		if docs == nil {
			http.Error(rw.W, "", http.StatusInternalServerError)
			return
		}
		con.HeaderSendOk(rw.W)
		_ = json.NewEncoder(rw.W).Encode(docs)
	}
}
