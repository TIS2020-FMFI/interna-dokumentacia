package document

import (
	"encoding/json"
	"fmt"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)


func getFilterDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		query, err := getQueryFilterDoc(request)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		docs := getCompletnessByQuery(query, writer)
		if docs != nil {
			con.HeaderSendOk(writer)
			_ = json.NewEncoder(writer).Encode(docs)
		}else {
			h.WriteErrWriteHaders(fmt.Errorf("docs is nul"), writer)
		}
	}
}

func getQueryFilterDoc(request *http.Request) (string, error) {
	var (
		doc h.Filter
		myMap map[string]string
	)
	e := json.NewDecoder(request.Body).Decode(&myMap)
	if e != nil {
		return "",e
	}
	doc.P =myMap
	return doc.BuildQuery(filterDoc),nil
}
