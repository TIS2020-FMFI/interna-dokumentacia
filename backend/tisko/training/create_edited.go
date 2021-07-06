package training

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func createEditedTraining(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		var newTraining OnlineTraining
		const name = "createEditedTraining"
		e := json.NewDecoder(request.Body).Decode(&newTraining)
		if e != nil {
			h.WriteErrWriteHandlers(e, name,writer)
			return
		}
		result := con.Db.Omit("edited", "old").Create(&newTraining)
		if result.Error != nil {
			h.WriteErrWriteHandlers(result.Error, name,writer)
			return
		}
		con.SendAccept(newTraining.Id, writer)
	}
}
