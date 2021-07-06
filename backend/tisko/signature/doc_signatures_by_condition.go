package signature

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	con "tisko/connection_database"
	h "tisko/helper"
	"tisko/signature/fake_structs"
)

const (
	superiorId = iota
	employeeId
	documentId
	filter
)

var (
	mapName = map[string]uint{
		"superior_id":superiorId,
	"employee_id":employeeId,
		"document_id":documentId,
	"filter":filter}
)

func getSkillMatrix(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		which, err := defineWhich(request)
		if err != nil{
			h.WriteErrWriteHandlers(err, "getSkillMatrix", writer)
			return
		}
		doAcordingWhich(writer, request, which)
	}
}

func defineWhich(request *http.Request) (uint, error) {
	for key, value := range mapName {
		got :=request.FormValue(key)
		if got!="" {
			return value, nil
		}
	}
	return 1000, fmt.Errorf("unknown name request")
}

func doAcordingWhich(writer http.ResponseWriter, request *http.Request, which uint) {
	var function func(writer http.ResponseWriter, request *http.Request)
	switch which {
	case superiorId:
		function = prepareIdQuery("superior_id", skillMatrixSuperiorId)
	case employeeId:
		function = prepareIdQuery("employee_id",skillMatrixEmployeeId)
	case documentId:
		function  =  prepareIdQuery("document_id", skillMatrixDocumentId)
	case filter:
		function = prepareFilter(skillMatrixFilter)
	default:
		h.WriteErrWriteHandlers(fmt.Errorf("unimplemented which request"), "doAcordingWhich", writer)
		return
	}
	function(writer, request)

}

func prepareFilter(query string) func(writer http.ResponseWriter, request *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		filterVant :=  request.FormValue("filter")
		jsonMap := make(map[string]string)
		err := json.Unmarshal([]byte(filterVant), &jsonMap)
		if err != nil{
			h.WriteErrWriteHandlers(fmt.Errorf("do not find id"), "anonim from prepareFilter", writer)
			return
		}
		filter0 := h.Filter{P: jsonMap}
		query = filter0.BuildQuery(query)
		modify := FetchMatrixByFilter(query)
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(modify)
	}
}

func prepareIdQuery(nameId, query string) func(writer http.ResponseWriter, request *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		tempFloat:= request.FormValue(nameId)
		const name = "prepareIdQuery"
		if tempFloat=="" {
			h.WriteErrWriteHandlers(fmt.Errorf("do not find id"), name, writer)
			return
		}
		id, err := strconv.ParseUint(tempFloat,10,64)
		if err != nil || id == 0 {
			h.WriteErrWriteHandlers(err, name, writer)
			return
		}
		modify := FetchMatrixByIdQuery(id, query)
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(modify)
	}
}

func FetchMatrixByFilter( query string) *ModifySignatures {
	signatures := &fake_structs.Signatures{}
	con.Db.Raw(query).Find(&signatures.EmployeeSignature)
	return convertSignatureFromFake(signatures).convertToModifySignature()
}

func FetchMatrixByIdQuery(id uint64, query string) *ModifySignatures {
	signatures := &fake_structs.Signatures{}
	con.Db.Raw(query, id).Find(&signatures.EmployeeSignature)
	return convertSignatureFromFake(signatures).convertToModifySignature()
}
