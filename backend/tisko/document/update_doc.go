package document

import (
	"encoding/json"
	"gorm.io/gorm"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func updateDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
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
		h.WriteErrWriteHandlers(err, writer)
		return false, 0
	}
	result := tx.Model(&doc).Select("*").Omit("edited", "old").Updates(&doc)
	if result.Error != nil {
		h.WriteErrWriteHandlers(result.Error, writer)
		return false, 0
	}
	return true, doc.Id
}
