package employee

import (
	"encoding/json"
	"fmt"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

const (
	nameColumn     = "login"
	passwordColumn = "password"
	email = "email"
)

func login(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer,request)  {
		rw := h.DataWR{
			S:  &h.MyStrings{
				First:  nameColumn,
				Second: passwordColumn,
			},
			RW: &h.RquestWriter{
				W: writer,
				R: request,
			},
		}
		loginBy(rw)
	}
}

func loginBy(rw h.DataWR) {
	name := rw.RW.R.FormValue(rw.S.First)
	passwd := rw.RW.R.FormValue(rw.S.Second)
	fmt.Println(name, passwd)
	if len(name)==0 || len(passwd)==0 {
		http.Error(rw.RW.W, fmt.Sprint(rw.S.First, " or ", rw.S.Second," is empty"), http.StatusInternalServerError)
		return
	}
	var e Employee
	re := con.Db.Where(fmt.Sprint(rw.S.First,"='", name, "' and ",
		rw.S.Second,"=", passwd,"::varchar")).First(&e)
	if re.Error!=nil {
		http.Error(rw.RW.W, re.Error.Error(), http.StatusInternalServerError)
		return
	}
	con.HeaderSendOk(rw.RW.W)
	_ = json.NewEncoder(rw.RW.W).Encode(e)

}
