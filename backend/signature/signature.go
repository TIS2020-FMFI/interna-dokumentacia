package signature

import (
	con "tisko/connection_database"
	"tisko/document"
	"tisko/employee"
	path "tisko/paths"
	"tisko/training"
)

type SignatureAndEmployee struct {
	employee.Employee `json:"employee"`
	document.Document `json:"document"`
	DocumentSignature `json:"signature"`
}

type SignatureAndDocument struct {
	document.Document `json:"document"`
	DocumentSignature `json:"signature"`
}

type OnlineTrainingAndSignature struct {
	training.OnlineTraining`json:"training"`
	OnlineTrainingSignature`json:"signature"`
}

type Signatures struct {
	DocumentSignature []SignatureAndDocument       `json:"document_signatures"`
	EmployeeSignature []SignatureAndEmployee       `json:"employee_signatures"`
	OnlineSignature []OnlineTrainingAndSignature `json:"online_training_signatures"`

}

func AddHandle() {
	con.AddHeaderGetID(path.Signatures, GetSignatures)
}