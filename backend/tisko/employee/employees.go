package employee

import (
	"encoding/json"
	con "tisko/connection_database"
	h "tisko/helper"
)

func sendByScript(rw h.RquestWriter, query string) {
	writer,request:= rw.W, rw.R
	if con.SetHeadersReturnIsContinue(writer,request)  {
		e,err := GetBasicEmployeesByQuery(query)
		if err!=nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(e)
	}
}

func GetBasicEmployeesByQuery(query string) ([]Employee,error) {
	var e []Employee
	re := con.Db.Raw(query).Find(&e)
	return e, re.Error
}