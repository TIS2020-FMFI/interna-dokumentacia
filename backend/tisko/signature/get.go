package signature

import (
	"encoding/json"
	"fmt"
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
	if con.SetHeadersReturnIsContinue(writer, request) {
		idString, ok := mux.Vars(request)["id"]
		if !ok {
			h.WriteErrWriteHaders(fmt.Errorf("do not find id"), writer)
			return
		}
		id, err := strconv.Atoi(idString)
		if err != nil || id < 0 {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		modifySignature := getSignaturesByscript(signs, id)

		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(modifySignature)
	}
}

func FetchMatrix(id uint64) *ModifySignatures {
	signatures := &fake_structs.Signatures{}
	con.Db.Raw(skillMatrixSuperiorId, id).Find(&signatures.EmployeeSignature)
	return convertSignatureFromFake(signatures).convertToModifySignature()
}
func getSignaturesByscript(Q h.QueryThreeStrings, id int) *ModifySignatures {
	signatures := &fake_structs.Signatures{}
	con.Db.Raw(Q.DocumentSignEmployee, id).Find(&signatures.EmployeeSignature)
	con.Db.Raw(Q.OnlineSign, id).Find(&signatures.OnlineSignature)
	con.Db.Raw(Q.DocumentSign, id).Find(&signatures.DocumentSignature)
	nonFake := convertSignatureFromFake(signatures)
	return nonFake.convertToModifySignature()
}