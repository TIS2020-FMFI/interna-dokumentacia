package signature

import h "tisko/helper"

var (
	unsignedSigns, signedSigns                      h.QueryThreeStrings
	skillMatrixSuperiorId, skillMatrixEmployeeId, skillMatrixDocumentId,
	skillMatrixFilter, cancelSigns, resigns     string
	querySign, querySignSuperior, querySignTraining string
	newEmployeesQuery                               string
)

const dir = "./signature/scripts_configs/"
func init0() {
	var queryDocumentSign, queryOnlineSign, queryDocumentSignEmployee string
	queryDocumentSign = h.ReturnTrimFile(dir+"unsigned_document_sign.txt")
	queryOnlineSign = h.ReturnTrimFile(dir+"unsigned_online_sign.txt")
	queryDocumentSignEmployee = h.ReturnTrimFile(dir+"unsigned_document_sign_employee.txt")
	unsignedSigns = h.QueryThreeStrings{
		DocumentSignEmployee: queryDocumentSignEmployee,
		OnlineSign:           queryOnlineSign,
		DocumentSign:         queryDocumentSign,
	}

	queryDocumentSign = h.ReturnTrimFile(dir+"signed_document_sign.txt")
	queryOnlineSign = h.ReturnTrimFile(dir+"signed_online_sign.txt")
	queryDocumentSignEmployee = h.ReturnTrimFile(dir+"signed_document_sign_employee.txt")
	signedSigns = h.QueryThreeStrings{
		DocumentSignEmployee: queryDocumentSignEmployee,
		OnlineSign:           queryOnlineSign,
		DocumentSign:         queryDocumentSign,
	}


	skillMatrixSuperiorId = h.ReturnTrimFile(dir+"all_signature_document_by_superior_id.txt")
	skillMatrixDocumentId = h.ReturnTrimFile(dir+"all_signature_document_by_doc_id.txt")
	skillMatrixEmployeeId = h.ReturnTrimFile(dir+"all_signature_document_by_employee_id.txt")
	skillMatrixFilter = h.ReturnTrimFile(dir+"all_signature_document_by_filter.txt")
	querySign = h.ReturnTrimFile(dir+"sign.txt")
	querySignSuperior = h.ReturnTrimFile(dir+"sign_superior.txt")
	querySignTraining = h.ReturnTrimFile(dir+"sign_training.txt")
	cancelSigns = h.ReturnTrimFile(dir+"cancel_signs_on_off.txt")
	resigns = h.ReturnTrimFile(dir+"resign.txt")
	newEmployeesQuery= h.ReturnTrimFile(dir+"new_employees_set_signatures.txt")
}
