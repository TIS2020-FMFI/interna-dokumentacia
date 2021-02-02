package signature

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
	con "tisko/connection_database"
	h "tisko/helper_func"
)

var queryDocumentSign,queryOnlineSign,queryDocumentSignEmployee string

func init() {
	queryDocumentSign = h.ReturnTrimFile("./config/query_document_sign.txt")
	queryOnlineSign = h.ReturnTrimFile("./config/query_online_sign.txt")
	queryDocumentSignEmployee = h.ReturnTrimFile(
		"./config/query_document_sign_employee.txt")
}

func GetSignatures(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer,request)  {
		id, err := strconv.Atoi(mux.Vars(request)["id"])
		if err != nil || id<0 {
			http.Error(writer, "must give number > 0", http.StatusInternalServerError)
			return
		}
		signatures := &Signatures{}

		con.Db.Raw(queryDocumentSignEmployee, id).Find(&signatures.EmployeeSignature)
		con.Db.Raw(queryOnlineSign, id).Find(&signatures.OnlineSignature)
		con.Db.Raw(queryDocumentSign, id).Find(&signatures.DocumentSignature)

		modifySignature := signatures.convertToModifySignature()

		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(writer).Encode(modifySignature)
	}
}