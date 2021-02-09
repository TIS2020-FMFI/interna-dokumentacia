package signature

import (
	"net/http"
	//con "tisko/connection_database"
	//h "tisko/helper"
)

func cancelResigns(writer http.ResponseWriter, request *http.Request) {
	/*var sign h.SignsSkillMatrix
	e := json.NewDecoder(request.Body).Decode(&sign)
	if e != nil {
		http.Error(writer, e.Error(), http.StatusInternalServerError)
		return
	}
	queryResign, err := getQueryResign(sign.Resign)
	if err == nil {
		con.Db.Exec(queryResign)
	}*/
}
//
//func getQueryResign(strings []string) (string, error) {
//	if strings == nil || len(strings)==0 {
//		return "", fmt.Errorf("empty")
//	}
//
//}
//
