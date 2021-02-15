package document

import (
	"gorm.io/gorm"
	h "tisko/helper"
)

var (
	addSignAfterConfirmDoc string
)
func AddSignature(combinations h.StringsBool, DocId uint64, tx *gorm.DB) error {
	var mails []h.TwoEmails
	re := tx.Raw(addSignAfterConfirmDoc,
		combinations.RequireSuperior,
		DocId,
		combinations.AssignedTo).Find(&mails)
	if re.Error != nil {
		return re.Error
	}
	//go mail.SendFistMail(mails, combinations)
	return nil
}
