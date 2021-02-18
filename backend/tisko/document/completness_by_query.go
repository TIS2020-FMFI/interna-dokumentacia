package document

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func getCompletnessByQuery(query string, writer http.ResponseWriter) {
	var docs []DocumentCompleteness
	re := con.Db.Raw(query).Find(&docs)
	if re.Error!= nil {
		h.WriteErrWriteHaders(re.Error, writer)
		return
	}
	con.HeaderSendOk(writer)
	_ = json.NewEncoder(writer).Encode(docs)
}
