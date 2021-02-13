package document

import (
	"gorm.io/gorm"
	h "tisko/helper"
	"tisko/mail"
)

var (
	addSignAfterConfirmDoc string
)
func AddSignature(combinations h.StringsBool, DocId uint64, tx *gorm.DB) {
	var mails []h.TwoEmails
	re := tx.Raw(addSignAfterConfirmDoc,
		combinations.RequireSuperior,
		DocId,
		combinations.AssignedTo).Find(&mails)
	if re.Error != nil {
		panic(re.Error)
	}
	go mail.SendFistMail(mails, combinations)
}
