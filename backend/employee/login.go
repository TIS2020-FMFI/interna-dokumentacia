package employee

import (
	"encoding/json"
	"fmt"
	"net/http"
	con"tisko/connection_database"
)

var (
	name_column = "login"
	password_column = "password"
)

func login(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer,request)  {
		name := request.FormValue(name_column)
		passwd := request.FormValue(password_column)
		fmt.Println(name, passwd)
		if len(name)==0 || len(passwd)==0 {
			http.Error(writer, fmt.Sprint(name_column, " or ", password_column," is empty"), http.StatusInternalServerError)
			return
		}
		var e Employee
		re := con.Db.Where(fmt.Sprint(name_column,"='", name, "' and ",
			password_column,"=", passwd,"::varchar")).First(&e)
		if re.Error!=nil {
			http.Error(writer, re.Error.Error(), http.StatusInternalServerError)
			return
		}
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(writer).Encode(e)
	}
}
