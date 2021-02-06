package signature

import h "tisko/helper"

var (
	unsignedSigns, signedSigns h.QueryThreeStrings
	skillMatrix string
	querysign, querysignSuperior, querysignTraining string
)

func init() {
	var queryDocumentSign, queryOnlineSign, queryDocumentSignEmployee string
	queryDocumentSign = h.ReturnTrimFile("./config/unsigned_document_sign.txt")
	queryOnlineSign = h.ReturnTrimFile("./config/unsigned_online_sign.txt")
	queryDocumentSignEmployee = h.ReturnTrimFile("./config/unsigned_document_sign_employee.txt")
	unsignedSigns = h.QueryThreeStrings{
		DocumentSignEmployee: queryDocumentSignEmployee,
		OnlineSign:           queryOnlineSign,
		DocumentSign:         queryDocumentSign,
	}
	queryDocumentSign = h.ReturnTrimFile("./config/signed_document_sign.txt")
	queryOnlineSign = h.ReturnTrimFile("./config/signed_online_sign.txt")
	queryDocumentSignEmployee = h.ReturnTrimFile("./config/signed_document_sign_employee.txt")
	signedSigns = h.QueryThreeStrings{
		DocumentSignEmployee: queryDocumentSignEmployee,
		OnlineSign:           queryOnlineSign,
		DocumentSign:         queryDocumentSign,
	}


	skillMatrix = h.ReturnTrimFile("./config/skill_matrix.txt")
	querysign = h.ReturnTrimFile("./config/sign.txt")
	querysignSuperior = h.ReturnTrimFile("./config/sign_superior.txt")
	querysignTraining = h.ReturnTrimFile("./config/sign_training.txt")
}
