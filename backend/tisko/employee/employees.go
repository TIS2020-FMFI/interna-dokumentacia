package employee

import (
	"encoding/json"
	con "tisko/connection_database"
	h "tisko/helper"
)

func sendByScript(rw h.RquestWriter, query string) {
	writer,request:= rw.W, rw.R
	if con.SetHeadersReturnIsContunue(writer,request)  {
		var e []BasicEmployee
		re := con.Db.Raw(query).Find(&e)
		if re.Error!=nil {
			h.WriteErrWriteHaders(re.Error, writer)
			return
		}
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(e)
	}
}