package connection_database

import "net/http"

func SetHeadersReturnIsContunue(writer http.ResponseWriter, request *http.Request) bool {
	writer.Header().Set("Access-Control-Allow-Origin", "*")
	if request.Method == "OPTIONS" {
		writer.Header().Set("Access-Control-Allow-Headers", "Authorization") // You can add more headers here if needed
		return false
	}
	return true
}

func AddHeaderPost(path string, f func(http.ResponseWriter, *http.Request)) {
	myRouter.HandleFunc(path, f).Methods("POST")
}

func AddHeaderGetID(path string, f func(http.ResponseWriter, *http.Request)) {
	myRouter.HandleFunc(path+"/{id}", f).Methods("GET")
}

func AddHeaderGet(path string, f func(http.ResponseWriter, *http.Request)) {
	myRouter.HandleFunc(path, f).Methods("GET")
}