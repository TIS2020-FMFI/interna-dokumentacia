package document

import (
	"fmt"
	"gorm.io/gorm"
	h "tisko/helper"
	"tisko/mail"
)

var (
	//addSignAfterConfirmDoc to load add_sign_after_confirm_doc.txt, which add signature and return mails
	addSignAfterConfirmDoc string
)

// AddSignature add signature and send mails
func AddSignature(combinations h.StringsBool, DocId uint64, tx *gorm.DB) error {
	var mails []h.TwoEmails
	re := tx.Raw(addSignAfterConfirmDoc,
		combinations.RequireSuperior,
		DocId,
		combinations.AssignedTo,
		combinations.AssignedTo).Find(&mails)
	if re.Error != nil {
		return re.Error
	}
	if len(mails)==0 {
		return fmt.Errorf("nobody")
	}
	go mail.SendFistMail(mails, combinations)
	return nil
}
