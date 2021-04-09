package signature

import (
	"tisko/document"
	"tisko/employee"
	"tisko/signature/fake_structs"
	"tisko/training"
)

type SignatureAndEmployee struct {
	Employee	employee.Employee `gorm:"embedded" json:"employee"`
	Document	document.Document `gorm:"embedded" json:"document"`
	DocumentSignature	DocumentSignature `gorm:"embedded" json:"signature"`
}

func convertOneEmployeeSignFromFake(andEmployee fake_structs.SignatureAndEmployee) SignatureAndEmployee {
	result := SignatureAndEmployee{
		Employee:           convertToNormalEmployee(andEmployee.Employee),
		Document:          convertToNormalDoc(andEmployee.Document),
		DocumentSignature: convertToNormalSignDoc(andEmployee.DocumentSignature),
	}
	return result
}

type SignatureAndDocument struct {
	Document	document.Document `gorm:"embedded" json:"document"`
	DocumentSignature	DocumentSignature `gorm:"embedded" json:"signature"`
}

func convertOneDocSignFromFake(andDocument fake_structs.SignatureAndDocument) SignatureAndDocument {
return SignatureAndDocument{
	Document:          convertToNormalDoc(andDocument.Document),
	DocumentSignature: convertToNormalSignDoc(andDocument.DocumentSignature),
}
}

type OnlineTrainingAndSignature struct {
	OnlineTraining	training.OnlineTraining`gorm:"embedded" json:"training"`
	OnlineTrainingSignature	OnlineTrainingSignature`gorm:"embedded" json:"signature"`
}

func convertOneOnlineSignFromFake(signature fake_structs.OnlineTrainingAndSignature) OnlineTrainingAndSignature {
return OnlineTrainingAndSignature{
	OnlineTraining:          convertToNormalTraining(signature.OnlineTraining),
	OnlineTrainingSignature: convertToNormalSingOnlineTraining(signature.OnlineTrainingSignature),
}
}

type Signatures struct {
	DocumentSignature []SignatureAndDocument
	EmployeeSignature []SignatureAndEmployee
	OnlineSignature []OnlineTrainingAndSignature
}

func convertSignatureFromFake(signatures *fake_structs.Signatures) *Signatures {
	result := &Signatures{}
	result.EmployeeSignature=convertEmployeeSignFromFake(signatures.EmployeeSignature)
	result.DocumentSignature=convertDocSignFromFake(signatures.DocumentSignature)
	result.OnlineSignature=convertOnlineSignFromFake(signatures.OnlineSignature)
	return result
}

func convertOnlineSignFromFake(signature []fake_structs.OnlineTrainingAndSignature) []OnlineTrainingAndSignature {
	result := make( []OnlineTrainingAndSignature, 0, len(signature))
	for i := 0; i < len(signature); i++ {
		result = append(result, convertOneOnlineSignFromFake(signature[i]))
	}
	return result
}

func convertDocSignFromFake(signature []fake_structs.SignatureAndDocument) []SignatureAndDocument {
	result := make( []SignatureAndDocument, 0, len(signature))
	for i := 0; i < len(signature); i++ {
		result = append(result, convertOneDocSignFromFake(signature[i]))
	}
	return result
}

func convertEmployeeSignFromFake(signature []fake_structs.SignatureAndEmployee) []SignatureAndEmployee {
	result := make( []SignatureAndEmployee, 0, len(signature))
	for i := 0; i < len(signature); i++ {
		result = append(result, convertOneEmployeeSignFromFake(signature[i]))
	}
	return result
}
