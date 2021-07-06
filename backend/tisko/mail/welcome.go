package mail

import (
	"fmt"
	h "tisko/helper"
)

// SendWelcome send to mails in strings massange: "welcome to our company you0 will need our website:"
func SendWelcome(mails []string)  {
	if mails == nil || len(mails)==0 {
		h.WriteMassageAsError(fmt.Errorf("empty new employees mail"), "SendWelcome")
		return
	}
	ee := emailNameLinkMessange{
		emails:   mails,
		name:     "welcome",
		link:     "gefko",
		massange: "welcome to our company you0 will need our website: http://5.178.48.91:8180/login",
	}
	sendEmail(ee)
}
