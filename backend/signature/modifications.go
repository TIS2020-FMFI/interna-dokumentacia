package signature

import (
	"tisko/document"
	"tisko/employee"
	"tisko/training"
)
type ModifyDocument struct {
	document.Document
	Sign []ModifySignDocument ` json:"signatures"`
}

type ModifySignDocument struct {
	DocumentSignature
	Employee *employee.Employee ` json:"employee"`
}

type ModifyTraining struct {
	training.OnlineTraining
	Sign []OnlineTrainingSignature ` json:"signatures"`

}

type ModifySignatures struct {
	DocumentSignature []ModifyDocument       `json:"documents"`
	OnlineSignature []ModifyTraining `json:"online_trainings"`
}

func createEmptyModifySignaturesWithCapacity(s *Signatures) *ModifySignatures {
	return &ModifySignatures{
		DocumentSignature: make([]ModifyDocument,0, len(s.EmployeeSignature)/2+
			len(s.DocumentSignature)/2),
		OnlineSignature:   make([]ModifyTraining,0, len(s.OnlineSignature)/2),
	}
}
func SignatureToModify(signature DocumentSignature) ModifySignDocument {
	return ModifySignDocument{
		DocumentSignature: signature,Employee: nil,
	}
}

func convertDocumentToModify(d document.Document) *ModifyDocument {
	return &ModifyDocument{
		Document: d,
		Sign:     make([]ModifySignDocument,0,200),
	}
}
func convertTrainingToModify(onlineTraining training.OnlineTraining) *ModifyTraining {
	return &ModifyTraining{
		OnlineTraining: onlineTraining,
		Sign:     make([]OnlineTrainingSignature,0,200),
	}
}
