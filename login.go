package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var (
	name_column = "first_name"
	password_column = "passwd"
)

func login(writer http.ResponseWriter, request *http.Request) {
	name := request.FormValue(name_column)
	passwd := request.FormValue(password_column)
	if len(name)==0 || len(passwd)==0 {
		http.Error(writer, fmt.Sprint(name_column, " or ", password_column," is empty"), http.StatusInternalServerError)
		return
	}
	var e Employee
	re := db.Where(fmt.Sprint(name_column,"='", name, "' and ",
		password_column,"=", passwd,"::varchar")).First(&e)
	if re.Error!=nil {
		http.Error(writer, re.Error.Error(), http.StatusInternalServerError)
		return
	}

	js, err := json.Marshal(e)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	_, _ = writer.Write(js)
}