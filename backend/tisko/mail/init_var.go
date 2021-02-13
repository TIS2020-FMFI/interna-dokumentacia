package mail

import (
	"encoding/json"
	"time"
	h "tisko/helper"
)

const (
	day = time.Hour*24
	debug = true
	path = "./config/mail.lock"
)

var (
	configuration *config
	adminMails *adminEmails
	numTime *DateNumber
	querySuperiorEmails, queryEmployeeEmails, oldDoc string
)

func init0() {
	loadConfig()
	loadQuery()
}

func loadQuery() {
	querySuperiorEmails = h.ReturnTrimFile("./config/mail_superior.txt")
	queryEmployeeEmails = h.ReturnTrimFile("./config/mail_employee.txt")
	oldDoc = h.ReturnTrimFile("./config/old_document.txt")
}


func loadConfig() {
	stringConfig := h.ReturnTrimFile("./config/mail_config.txt")
	err := json.Unmarshal([]byte(stringConfig), &configuration)
	h.Check(err)
	stringConfig = h.ReturnTrimFile("./config/emails_of_admins.txt")
	err = json.Unmarshal([]byte(stringConfig), &adminMails)
	h.Check(err)
	stringConfig = h.ReturnTrimFile("./config/mail.lock")
	err = json.Unmarshal([]byte(stringConfig), &numTime)
	if err != nil {
		numTime=&DateNumber{
			date:   time.Now(),
			number: 0,
		}
	}
}