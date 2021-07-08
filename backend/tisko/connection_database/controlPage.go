package connection_database

import (
	"net/http"
)
//accept local struct for acceptation massage
type accept struct {
	Message string `json:"message"`
	Id      uint64 `json:"id"`
}

//controlPage handler for control running server
func controlPage(writer http.ResponseWriter, request *http.Request) {
	if SetHeadersReturnIsContinue(writer,request)  {
		SendAccept(7777, writer)
	}
}
