package signature

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	con "tisko/connection_database"
	h "tisko/helper"

	//con "tisko/connection_database"
	//h "tisko/helper"
)

func cancel(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		var (
			sign0                 interface{}
		)
		e := json.NewDecoder(request.Body).Decode(&sign0)
		if e != nil {
			h.WriteErrWriteHandlers(e, writer)
			return
		}
		queryCancel, err := formatQuery(sign0, cancelSigns)
		if executeIfNotErr(queryCancel, err) > 0 {
			con.SendAccept(0, writer)
		}else {
			h.WriteErrWriteHandlers(fmt.Errorf(fmt.Sprint("nothing was execute", err)), writer)
		}
	}
}
func resign(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		var (
			sign0                interface{}
		)
		e := json.NewDecoder(request.Body).Decode(&sign0)
		if e != nil {
			h.WriteErrWriteHandlers(e, writer)
			return
		}
		queryResign, err := formatQuery(sign0, resigns)
		if executeIfNotErr(queryResign, err) > 0 {
			con.SendAccept(0, writer)
		}else {
			h.WriteErrWriteHandlers(fmt.Errorf(fmt.Sprint("nothing was execute", err)), writer)
		}
	}
}
func executeIfNotErr(query string, err error) int {
	if err == nil {
		re := con.Db.Exec(query)
		if re.Error == nil {
			return 1
		}
	}
	return 0
}

func formatQuery(array interface{}, query string) (string, error) {
	if array==nil{
		return "", fmt.Errorf("empty")
	}
	return strings.ReplaceAll(query, "?",
		fmt.Sprint("array[ ", array," ]")), nil
}
