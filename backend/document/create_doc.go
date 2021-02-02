package document

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
)

func createDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		var doc Document
		_ = json.NewDecoder(request.Body).Decode(&doc)
		result := con.Db.Omit("Id").Create(&doc)
		if result.Error != nil {
			http.Error(writer, result.Error.Error(), http.StatusInternalServerError)
		}
		responseStruct := struct {
			status string
			id     uint
		}{"accept", doc.Id}
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(writer).Encode(responseStruct)
	}
}