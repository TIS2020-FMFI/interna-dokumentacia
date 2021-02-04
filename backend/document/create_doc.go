package document

import (
	"encoding/json"
	"gorm.io/gorm"
	"net/http"
	con "tisko/connection_database"
)

func createDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		id, ok := doCreate(writer, request, nil)
		if !ok {
			return
		}
		con.SendAccept(uint(id), writer)
	}
}

func doCreate(writer http.ResponseWriter, request *http.Request, tx *gorm.DB) (uint, bool) {
	var doc Document
	_ = json.NewDecoder(request.Body).Decode(&doc)
	result := con.Db.Omit("Id").Create(&doc)
	if result.Error != nil {
		http.Error(writer, result.Error.Error(), http.StatusInternalServerError)
		return 0,false
	}
	return doc.Id, true
}