package document

import (
	"encoding/json"
	"fmt"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	con "tisko/connection_database"
	h "tisko/helper"
)

func updateDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		ok, id := doUpdate(writer, request, con.Db)
		if !ok {
			return
		}
		con.SendAccept(id, writer)
	}
}

func doUpdate(writer http.ResponseWriter, request *http.Request, tx *gorm.DB) (bool, uint64) {
	var doc map[string]interface{}
	err := json.NewDecoder(request.Body).Decode(&doc)
	id, err2 := getIdMap(doc)
	if err != nil || err2!=nil{
		h.WriteErrWriteHaders(err, writer)
		return false, 0
	}
	result := tx.Model(&Document{Id: id}).Updates(&doc)
	if result.Error != nil {
		h.WriteErrWriteHaders(result.Error, writer)
		return false, 0
	}
	return true, id
}

func getIdMap(doc map[string]interface{}) (uint64, error) {
	result, err := strconv.ParseUint(fmt.Sprint(doc["id"]),10,64)
	if err==nil {
		return result, nil
	}
	return 0, fmt.Errorf("convert error")
}