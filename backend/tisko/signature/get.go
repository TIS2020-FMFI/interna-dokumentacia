package signature

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
	con "tisko/connection_database"
	h "tisko/helper"
	"tisko/signature/fake_structs"
)


func getUnsignedSignatures(writer http.ResponseWriter, request *http.Request) {
	getSignatures(writer, request, unsignedSigns)
}

func getSignedSignatures(writer http.ResponseWriter, request *http.Request) {
	getSignatures(writer, request, signedSigns)
}

func getSignatures(writer http.ResponseWriter, request *http.Request, signs h.QueryThreeStrings) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		id, err := strconv.Atoi(mux.Vars(request)["id"])
		if err != nil || id < 0 {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		modifySignature := getSignaturesByscript(signs, id)

		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(modifySignature)
	}
}

func getSignaturesByscript(Q h.QueryThreeStrings, id int) *ModifySignatures {
	signatures := &fake_structs.Signatures{}
	con.Db.Raw(Q.DocumentSignEmployee, id).Find(&signatures.EmployeeSignature)
	con.Db.Raw(Q.OnlineSign, id).Find(&signatures.OnlineSignature)
	con.Db.Raw(Q.DocumentSign, id).Find(&signatures.DocumentSignature)
	nonFake := convertSignatureFromFake(signatures)
	return nonFake.convertToModifySignature()
}

func getSkillMatrix(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		id, err := strconv.ParseUint(mux.Vars(request)["id"],10,64)
		if err != nil || id == 0 {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		modify := FetchMatrix(id)
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(modify)
	}
}

func FetchMatrix(id uint64) *ModifySignatures {
	signatures := &fake_structs.Signatures{}
	con.Db.Raw(skillMatrix, id).Find(&signatures.EmployeeSignature)
	return convertSignatureFromFake(signatures).convertToModifySignature()
}