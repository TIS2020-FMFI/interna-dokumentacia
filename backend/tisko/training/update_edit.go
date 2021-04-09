package training

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func updateEditedTraining(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		var (
			newTraining  OnlineTraining
		)
		e :=json.NewDecoder(request.Body).Decode(&newTraining)
		if e != nil {
			h.WriteErrWriteHaders(e, writer)
			return
		}
		result := con.Db.Model(&newTraining).Select("*").Omit("edited").Updates(&newTraining)
		if result.Error != nil {
			h.WriteErrWriteHaders(result.Error, writer)
			return
		}
		con.SendAccept(newTraining.Id, writer)
	}
}