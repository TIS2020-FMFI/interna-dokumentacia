package document

import (
	"net/http"
	con "tisko/connection_database"
)

func aktualDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		getCompletnessByQuery(actualDoc, writer)
	}
}
