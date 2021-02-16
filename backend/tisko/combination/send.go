package combination

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

var queryCombinationAll string

func init0() {
	queryCombinationAll = h.ReturnTrimFile(
		"./config/combinations.txt")
}

func sendAll(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		var combi []CombinationFull
		re := con.Db.Raw(queryCombinationAll).Find(&combi)
		if re.Error!=nil {
			h.WriteErrWriteHaders(re.Error, writer)
			return
		}
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(combi)
	}
}

func sendAllBranches(writer http.ResponseWriter, request *http.Request) {
	name := "branches"
	rw := h.RquestWriter{W: writer, R: request}
	sendAllStructs(name, rw)
}
func sendAllCities(writer http.ResponseWriter, request *http.Request) {
	name := "cities"
	rw := h.RquestWriter{W: writer, R: request}
	sendAllStructs(name, rw)
}

func sendAllDepartments(writer http.ResponseWriter, request *http.Request) {
	name := "departments"
	rw := h.RquestWriter{W: writer, R: request}
	sendAllStructs(name, rw)
}

func sendAllDivisions(writer http.ResponseWriter, request *http.Request) {
	name := "divisions"
	rw := h.RquestWriter{W: writer, R: request}
	sendAllStructs(name, rw)
}

func sendAllStructs(nameTable string, rw h.RquestWriter) {
	var result []IdName
	if con.SetHeadersReturnIsContunue(rw.W, rw.R) {
		re := con.Db.Table(nameTable).Find(&result)
		if re.Error != nil {
			h.WriteErrWriteHaders(re.Error, rw.W)
			return
		}
		con.HeaderSendOk(rw.W)
		_ = json.NewEncoder(rw.W).Encode(result)
	}
}
