package document

import (
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func getCompletnessByQuery(query string, writer http.ResponseWriter) []DocumentCompleteness {
	var docs []DocumentCompleteness
	re := con.Db.Raw(query).Find(&docs)
	if re.Error!= nil {
		h.WriteErrWriteHaders(re.Error, writer)
		return nil
	}
	return docs
}
