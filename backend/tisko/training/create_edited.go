package training

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func createEditedTraining(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		var newTraining OnlineTraining
		e := json.NewDecoder(request.Body).Decode(&newTraining)
		if e != nil {
			h.WriteErrWriteHaders(e, writer)
			return
		}
		result := con.Db.Omit("edited", "old").Create(&newTraining)
		if result.Error != nil {
			h.WriteErrWriteHaders(result.Error, writer)
			return
		}
		con.SendAccept(newTraining.Id, writer)
	}
}
