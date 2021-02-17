package document

import (
	"encoding/json"
	"gorm.io/gorm"
	"net/http"
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
	var doc Document
	err := json.NewDecoder(request.Body).Decode(&doc)
	if err != nil {
		h.WriteErrWriteHaders(err, writer)
		return false, 0
	}
	result := tx.Omit("edited", "old").Updates(&doc)
	if result.Error != nil {
		h.WriteErrWriteHaders(result.Error, writer)
		return false, 0
	}
	return true, doc.Id
}
