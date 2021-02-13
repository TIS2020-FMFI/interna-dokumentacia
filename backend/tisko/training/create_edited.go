package training

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
)

func createEditedTraining(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		var newTraining OnlineTraining
		e := json.NewDecoder(request.Body).Decode(&newTraining)
		if e != nil {
			http.Error(writer, e.Error(), http.StatusInternalServerError)
			return
		}
		result := con.Db.Create(&newTraining)
		if result.Error != nil {
			http.Error(writer, result.Error.Error(), http.StatusInternalServerError)
			return
		}
		con.SendAccept(newTraining.Id, writer)
	}
}
