package document

import (
	"encoding/json"
	"fmt"
	"gorm.io/gorm"
	"net/http"
	con "tisko/connection_database"
)

func updateDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		ok, id := doUpdate(writer, request, nil)
		if !ok {
			return
		}
		con.SendAccept(uint(id), writer)
	}
}

func doUpdate(writer http.ResponseWriter, request *http.Request, tx *gorm.DB) (bool, uint) {
	var doc map[string]interface{}
	err := json.NewDecoder(request.Body).Decode(&doc)
	id, err2 := getIdMap(doc)
	if err != nil || err2!=nil{
		http.Error(writer, "eror at find doc id", http.StatusInternalServerError)
		return false, 0
	}
	result := tx.Model(&Document{Id: id}).Updates(&doc)
	if result.Error != nil {
		http.Error(writer, result.Error.Error(), http.StatusInternalServerError)
		return false, 0
	}
	return true, id
}

func getIdMap(doc map[string]interface{}) (uint, error) {
	result, ok := doc["id"].(uint)
	if ok {
		return result, nil
	}
	return 0, fmt.Errorf("convert error")
}