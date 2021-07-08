package connection_database

import (
	"encoding/json"
	"net/http"
)

// SetHeadersReturnIsContinue
// give allow to all headers: set 'Access-Control-Allow-Origin' to '*'
func SetHeadersReturnIsContinue(writer http.ResponseWriter, request *http.Request) bool {
	writer.Header().Set("Access-Control-Allow-Origin", "*")
	if request.Method == "OPTIONS" {
		writer.Header().Set("Access-Control-Allow-Headers", "Authorization") // You can add more headers here if needed
		return false
	}
	return true
}

// AddHeaderPost
// add header with path to package's variable 'myRouter' like post method, function f will listen on path
func AddHeaderPost(path string, f func(http.ResponseWriter, *http.Request)) {
	myRouter.HandleFunc(path, f).Methods("POST")
}

// AddHeaderGetID
// add header with path to package's variable 'myRouter' like get method, function f will listen on path with ending '/id', where 'id' is number
func AddHeaderGetID(path string, f func(http.ResponseWriter, *http.Request)) {
	myRouter.HandleFunc(path+"/{id}", f).Methods("GET")
}

// AddHeaderGet add header with path to package's variable 'myRouter' like get method, function f will listen on path
func AddHeaderGet(path string, f func(http.ResponseWriter, *http.Request)) {
	myRouter.HandleFunc(path, f).Methods("GET")
}

// HeaderSendOk
// set 'Content-Type' of writer http.ResponseWriter header to 'application/json' and send StatusOK
func HeaderSendOk(writer http.ResponseWriter) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
}

// SendAccept send json {"accept", id} to writer http.ResponseWriter and send 'ok-header'
func SendAccept(id uint64, writer http.ResponseWriter) {
	responseStruct := accept{"accept", id}
	HeaderSendOk(writer)
	_ = json.NewEncoder(writer).Encode(responseStruct)
}