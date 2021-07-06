package employee

import (
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strings"
	h "tisko/helper"
)

func getFiltered(writer http.ResponseWriter, request *http.Request) {

	val, ok := mux.Vars(request)["filter"]
	if !ok {
		h.WriteErrWriteHandlers(fmt.Errorf("not found 'filter'"), "getFiltered", writer)
		return
	}
	queryFilterEmployeesPrepared := strings.ReplaceAll(queryFilterEmployees, "Query1", fmt.Sprint("'", val, "'"))
	sendByScript(h.RquestWriter{
		W: writer,
		R: request,
	}, queryFilterEmployeesPrepared)
}