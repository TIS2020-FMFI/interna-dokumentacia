package combination

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
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
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(combi)
	}
}