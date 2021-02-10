package document

import (
	"net/http"
	h "tisko/helper"
)

func getEditedDoc(writer http.ResponseWriter, request *http.Request) {
	sendDocByQuery(editedDoc, h.RquestWriter{
		W: writer,
		R: request,
	})
}
