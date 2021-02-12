package document

import h "tisko/helper"

var (
	confirm, actualDoc, editedDoc, filterDoc string
)

func init0() {
	confirm=h.ReturnTrimFile("./config/confirm.txt")
	addSignAfterConfirmDoc = h.ReturnTrimFile("./config/add_sign_after_confirm_doc.txt")
	actualDoc=h.ReturnTrimFile("./config/aktual_doc.txt")
	editedDoc=h.ReturnTrimFile("./config/edited_doc.txt")
	filterDoc= h.ReturnTrimFile("./config/doc_filter.txt")
}
