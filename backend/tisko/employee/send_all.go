package employee

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func getAll(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer,request)  {
		var e []BasicEmployee
		re := con.Db.Raw(queryAllEmployees).Find(&e)
		if re.Error!=nil {
			h.WriteErrWriteHaders(re.Error, writer)
			return
		}
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(e)
	}
}