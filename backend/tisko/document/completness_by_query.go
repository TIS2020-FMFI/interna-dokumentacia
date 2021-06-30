package document

import (
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

//getCompletnessByQuery return from database documents, which have adding information about Completeness signature
func getCompletnessByQuery(query string, writer http.ResponseWriter) []DocumentCompleteness {
	var docs []DocumentCompleteness
	re := con.Db.Raw(query).Find(&docs)
	if re.Error!= nil {
		h.WriteErrWriteHandlers(re.Error, writer)
		return nil
	}
	return docs
}
