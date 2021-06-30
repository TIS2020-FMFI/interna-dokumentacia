package combination

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

// queryCombinationAll local variable of SQL command for all actual combinations
var queryCombinationAll string

// dir local constant to load txt files
const dir = "./combination/"

// init0 init queryCombinationAll from dir+"combinations.txt"
func init0() {
	queryCombinationAll = h.ReturnTrimFile(dir+"combinations.txt")
}

// sendAll handle for all actual combinations according queryCombinationAll local variable of SQL command
func sendAll(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		var combi []CombinationFull
		re := con.Db.Raw(queryCombinationAll).Find(&combi)
		if re.Error!=nil {
			h.WriteErrWriteHandlers(re.Error, writer)
			return
		}
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(combi)
	}
}

// sendAllBranches handle for all branches
func sendAllBranches(writer http.ResponseWriter, request *http.Request) {
	name := "branches"
	rw := h.RquestWriter{W: writer, R: request}
	sendAllStructs(name, rw)
}

// sendAllCities handle for all cities
func sendAllCities(writer http.ResponseWriter, request *http.Request) {
	name := "cities"
	rw := h.RquestWriter{W: writer, R: request}
	sendAllStructs(name, rw)
}

// sendAllDepartments handle for all departments
func sendAllDepartments(writer http.ResponseWriter, request *http.Request) {
	name := "departments"
	rw := h.RquestWriter{W: writer, R: request}
	sendAllStructs(name, rw)
}

// sendAllDivisions handle for all divisions
func sendAllDivisions(writer http.ResponseWriter, request *http.Request) {
	name := "divisions"
	rw := h.RquestWriter{W: writer, R: request}
	sendAllStructs(name, rw)
}

// sendAllStructs common send JSON: [(ID1, name1), (ID2, name2), ............]
func sendAllStructs(nameTable string, rw h.RquestWriter) {
	var result []IdName
	if con.SetHeadersReturnIsContinue(rw.W, rw.R) {
		re := con.Db.Table(nameTable).Find(&result)
		if re.Error != nil {
			h.WriteErrWriteHandlers(re.Error, rw.W)
			return
		}
		con.HeaderSendOk(rw.W)
		_ = json.NewEncoder(rw.W).Encode(result)
	}
}
