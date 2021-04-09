package signature

import (
	"net/http"
	"strconv"
	con "tisko/connection_database"
	h"tisko/helper"
)

func signSuperior(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		rw :=h.RquestWriter{
			W: writer,
			R: request,
		}
		signCommon(rw, querySignSuperior)
	}
}

func sign(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		rw :=h.RquestWriter{
			W: writer,
			R: request,
		}
		signCommon(rw, querySign)
	}
}
func signTraining(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		rw :=h.RquestWriter{
			W: writer,
			R: request,
		}
		signCommon(rw, querySignTraining)
	}
}

func signCommon(rw h.RquestWriter, q string) {
	x := rw.R.FormValue("id")
	id, err := strconv.ParseUint(x+"",10,64)
	if err != nil {
		h.WriteErrWriteHaders(err, rw.W)
		return
	}
	var messange string
	result :=con.Db.Raw(q, id).Find(&messange)
	if result.Error != nil {
		h.WriteErrWriteHaders(result.Error, rw.W)
		return
	}
	con.SendAccept(id, rw.W)
}
