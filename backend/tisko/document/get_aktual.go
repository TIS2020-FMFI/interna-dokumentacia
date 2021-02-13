package document

import (
	"net/http"
	h "tisko/helper"
)

func aktualDoc(writer http.ResponseWriter, request *http.Request) {
	sendDocByQuery(actualDoc, h.RquestWriter{
		W: writer,
		R: request,
	})
}
