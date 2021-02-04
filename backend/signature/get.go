package signature

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
	con "tisko/connection_database"
	h "tisko/helper"
)


func getUnsignedSignatures(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		id, err := strconv.Atoi(mux.Vars(request)["id"])
		if err != nil || id < 0 {
			http.Error(writer, "must give number > 0", http.StatusInternalServerError)
			return
		}
		modifySignature := getSignaturesByscript(unsignedSigns, id)

		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(modifySignature)
	}
}

func getSignaturesByscript(Q h.QueryThreeStrings, id int) *ModifySignatures {
	signatures := &Signatures{}
	con.Db.Raw(Q.DocumentSignEmployee, id).Find(&signatures.EmployeeSignature)
	con.Db.Raw(Q.OnlineSign, id).Find(&signatures.OnlineSignature)
	con.Db.Raw(Q.DocumentSign, id).Find(&signatures.DocumentSignature)
	return signatures.convertToModifySignature()
}

func getSkillMatrix(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		signatures := &Signatures{}
		id, err := strconv.Atoi(mux.Vars(request)["id"])
		if err != nil || id < 0 {
			http.Error(writer, "must give number > 0", http.StatusInternalServerError)
			return
		}
		con.Db.Raw(skillMatrix, id).Find(&signatures.EmployeeSignature)
		modify := signatures.convertToModifySignature()
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(modify)
	}
}
