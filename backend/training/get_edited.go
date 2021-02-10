package training

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
)

func getEditedTrianing(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer,request) {
		var docs []OnlineTraining
		con.Db.Raw(editedTraining).Find(&docs)
		if docs == nil {
			http.Error(writer, "", http.StatusInternalServerError)
			return
		}
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(docs)
	}
}
