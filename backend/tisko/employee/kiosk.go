package employee

import (
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)


func kiosk(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer,request)  {
		rw := h.DataWR{
			S:  &h.MyStrings{
				First:  h.NameColumn,
				Second: h.PasswordColumn,
			},
			RW: &h.RquestWriter{
				W: writer,
				R: request,
			},
		}
		loginBy(rw)
	}
}