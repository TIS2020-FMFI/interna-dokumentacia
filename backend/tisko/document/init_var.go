package document

import (
	h "tisko/helper"
	"tisko/paths"
)

var (
	confirm, actualDoc, editedDoc, filterDoc string
)

const dir = paths.GlobalDir +"document/"
func init0() {
	confirm=h.ReturnTrimFile(dir+"confirm.txt")
	addSignAfterConfirmDoc = h.ReturnTrimFile(dir+"add_sign_after_confirm_doc.txt")
	actualDoc=h.ReturnTrimFile(dir+"aktual_doc.txt")
	editedDoc=h.ReturnTrimFile(dir+"edited_doc.txt")
	filterDoc= h.ReturnTrimFile(dir+"doc_filter.txt")
}
