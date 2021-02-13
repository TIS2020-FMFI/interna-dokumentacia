package signature

import "sort"

func (signatures *Signatures)convertToModifySignature() *ModifySignatures {
	containsMapDoc := make(map[uint64]*ModifyDocument, len(signatures.DocumentSignature))
	signatures.convertToModifySignatureDoc(containsMapDoc)
	containsMapOnline := make(map[uint64]*ModifyTraining, len(signatures.OnlineSignature))
	signatures.convertToModifySignatureOnline(containsMapOnline)
	return signatures.signFlushMapsToSlices(containsMapDoc, containsMapOnline)
}

func (signatures *Signatures) convertToModifySignatureDoc(containsMap map[uint64]*ModifyDocument) {
	for i := 0; i < len(signatures.DocumentSignature); i++ {
		documentSignature := signatures.DocumentSignature[i]
		convertOneSigniture(containsMap, documentSignature)
	}
	for i := 0; i < len(signatures.EmployeeSignature); i++ {
		documentSignature := signatures.EmployeeSignature[i]
		convertOneSignitureEmployee(containsMap, documentSignature)
	}
}

func convertOneSigniture(containsMap map[uint64]*ModifyDocument, signature SignatureAndDocument) {
	var ModifyDocument *ModifyDocument
	m, ok:= containsMap[signature.Document.Id]
	ModifyDocument = m
	if !ok {
		ModifyDocument = convertDocumentToModify(signature.Document)
		containsMap[signature.Document.Id]=ModifyDocument
	}
	careSign(ModifyDocument, signature)
}

func careSign(modifyDocument *ModifyDocument, signature SignatureAndDocument) {
		signatureModify := SignatureToModify(signature.DocumentSignature)
	modifyDocument.Sign = append(modifyDocument.Sign, signatureModify)
}

func convertOneSignitureEmployee(containsMap map[uint64]*ModifyDocument,
	signature SignatureAndEmployee) {
	var ModifyDocument *ModifyDocument
	m, ok:= containsMap[signature.Document.Id]
	ModifyDocument = m
	if !ok {
		ModifyDocument = convertDocumentToModify(signature.Document)
		containsMap[signature.Document.Id]=ModifyDocument
	}
	careSignEmployee(ModifyDocument, signature)
}

func careSignEmployee(modifyDocument *ModifyDocument, signature SignatureAndEmployee) {
		signatureModify :=  SignatureToModify(signature.DocumentSignature)
		signatureModify.Employee=&signature.Employee
	modifyDocument.Sign = append(modifyDocument.Sign, signatureModify)
}

func (signatures *Signatures) convertToModifySignatureOnline(online map[uint64]*ModifyTraining) {
	for i := 0; i < len(signatures.OnlineSignature); i++ {
		documentSignature := signatures.OnlineSignature[i]
		convertOneSignitureOnline(online, documentSignature)
	}
}

func convertOneSignitureOnline(online map[uint64]*ModifyTraining, signature OnlineTrainingAndSignature) {
	var modifyTraining *ModifyTraining
	m, ok:= online[signature.OnlineTraining.Id]
	modifyTraining = m
	if !ok {
		modifyTraining = convertTrainingToModify(signature.OnlineTraining)
		online[signature.OnlineTraining.Id]=modifyTraining
	}
	modifyTraining.Sign = append(modifyTraining.Sign, signature.OnlineTrainingSignature)
}

func  (signatures *Signatures)signFlushMapsToSlices(doc map[uint64]*ModifyDocument, online map[uint64]*ModifyTraining) *ModifySignatures {

	result := createEmptyModifySignaturesWithCapacity(signatures)

	for  _, value := range doc {
		result.DocumentSignature = append(result.DocumentSignature, *value)
	}
	sort.SliceStable(result.DocumentSignature, func(i, j int) bool {
		return result.DocumentSignature[i].Deadline.Time.Before(result.DocumentSignature[j].Deadline.Time)
	})
	for  _, value := range online {
		result.OnlineSignature = append(result.OnlineSignature, *value)
	}
	return result
}