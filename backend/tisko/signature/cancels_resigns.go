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
			http.Error(writer, e.Error(), http.StatusInternalServerError)
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
			http.Error(writer, "nothing was execute", http.StatusInternalServerError)
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

func formatQuery(array []uint64, query string) (string, error) {
	if h.IsemptyUint64(array) {
		return "", fmt.Errorf("empty")
	}
	return strings.ReplaceAll(query, "?",
		fmt.Sprint("array[ ", h.ArrayUint64ToString(array, ",")," ]")), nil
}
