package training

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
)

func updateEditedTraining(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		var (
			newTraining  OnlineTraining
			map0  map[string]interface{}
		)
		e := json.NewDecoder(request.Body).Decode(&map0)
		e = json.NewDecoder(request.Body).Decode(&newTraining)
		if e != nil {
			http.Error(writer, e.Error(), http.StatusInternalServerError)
			return
		}
		delete(map0,"id")
		result := con.Db.Model(&newTraining).Updates(&map0)
		if result.Error != nil {
			http.Error(writer, result.Error.Error(), http.StatusInternalServerError)
			return
		}
		con.SendAccept(newTraining.Id, writer)
	}
}