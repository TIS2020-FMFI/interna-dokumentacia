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

func cancelResigns(writer http.ResponseWriter, request *http.Request) {
	var sign h.SignsSkillMatrix
	if con.SetHeadersReturnIsContunue(writer, request) {
		e := json.NewDecoder(request.Body).Decode(&sign)
		if e != nil {
			h.WriteErrWriteHaders(e, writer)
			return
		}
		queryResign, err := formatQuery(sign.Resign, resigns)
		queryCancel, err0 := formatQuery(sign.Resign, cancel_signs)
		num := 0
		num += executeIfNotErr(queryResign, err)
		num += executeIfNotErr(queryCancel, err0)
		if num > 0 {
			con.SendAccept(0, writer)
		}else {
			h.WriteErrWriteHaders(fmt.Errorf(fmt.Sprint("nothing was execute", err, ", ", err0)), writer)
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

func formatQuery(array string, query string) (string, error) {
	if len(array)==0 {
		return "", fmt.Errorf("empty")
	}
	return strings.ReplaceAll(query, "?",
		fmt.Sprint("array[ ", array," ]")), nil
}
