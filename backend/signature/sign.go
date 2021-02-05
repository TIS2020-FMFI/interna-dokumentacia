package signature

import (
	"net/http"
	"strconv"
	con "tisko/connection_database"
	"tisko/helper"
)

func signSuperior(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		rw :=helper.RquestWriter{
			W: writer,
			R: request,
		}
		signCommon(rw, querysignSuperior)
	}
}

func sign(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		rw :=helper.RquestWriter{
			W: writer,
			R: request,
		}
		signCommon(rw, querysign)
	}
}
func signTraining(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		rw :=helper.RquestWriter{
			W: writer,
			R: request,
		}
		signCommon(rw, querysignTraining)
	}
}

func signCommon(rw helper.RquestWriter, q string) {
	x := rw.R.FormValue("id")
	id, err := strconv.ParseUint(x+"",10,64)
	if err != nil {
		http.Error(rw.W, "must give number > 0", http.StatusInternalServerError)
		return
	}
	var messange string
	t :=con.Db.Raw(q, id).Find(&messange)
	if t.Error != nil {
		http.Error(rw.W, "error at sign", http.StatusInternalServerError)
		return
	}
	con.SendAccept(id, rw.W)
}
