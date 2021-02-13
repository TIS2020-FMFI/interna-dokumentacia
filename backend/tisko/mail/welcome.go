package mail

import (
	"fmt"
	h "tisko/helper"
)

func SendWelcome(mails []string)  {
	if mails == nil || len(mails)==0 {
		h.WriteErr(fmt.Errorf("empty new employees mail"))
		return
	}

}
