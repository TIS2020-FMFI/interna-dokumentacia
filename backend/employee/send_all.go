package employee

import (
	"net/http"
	h "tisko/helper"
)

func getAll(writer http.ResponseWriter, request *http.Request) {
	sendByScript(h.RquestWriter{
		W: writer,
		R: request,
	}, queryAllEmployees)
}
