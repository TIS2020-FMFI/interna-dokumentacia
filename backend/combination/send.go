package combination

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper_func"
)
var queryCombinationAll string

func init() {
	queryCombinationAll = h.ReturnTrimFile(
		"./config/combinations.txt")
}

func sendAll(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer,request)  {
		var combi []CombinationFull
		con.Db.Raw(queryCombinationAll).Find(&combi)
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(writer).Encode(combi)
	}
}