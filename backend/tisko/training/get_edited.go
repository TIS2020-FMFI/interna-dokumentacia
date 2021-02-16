package training

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func getEditedTrainings(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer,request) {
		var docs []OnlineTraining
		re := con.Db.Raw(editedTraining).Find(&docs)
		if re.Error!= nil {
			h.WriteErrWriteHaders(re.Error, writer)
			return
		}
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(docs)
	}
}
