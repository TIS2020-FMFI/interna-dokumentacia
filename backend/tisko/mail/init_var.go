package mail

import (
	"encoding/json"
	"time"
	h "tisko/helper"
	"tisko/paths"
)

const (
	day = time.Hour*24
	debug = false
)

var (
	configuration *config
	adminMails *adminEmails
	twoTimes *TwoTimes
	querySuperiorEmails, queryEmployeeEmails, oldDoc string
)

const dir = paths.GlobalDir +"mail/"
func init0() {
	loadConfig()
	loadQuery()
}

func loadQuery() {
	querySuperiorEmails = h.ReturnTrimFile(dir+"mail_superior.txt")
	queryEmployeeEmails = h.ReturnTrimFile(dir+"mail_employee.txt")
	oldDoc = h.ReturnTrimFile(dir+"old_document.txt")
}


func loadConfig() {
	loadMailTime()
	loadOtherConfig()
}

func loadOtherConfig() {
	stringConfig := h.ReturnTrimFile(dir+"mail_config.txt")
	err := json.Unmarshal([]byte(stringConfig), &configuration)
	h.Check(err)
	stringConfig = h.ReturnTrimFile(dir+"emails_of_admins.txt")
	err = json.Unmarshal([]byte(stringConfig), &adminMails)
	h.Check(err)
}

func loadMailTime() {
	defer func() {
		r := recover()
		if r != nil {
			h.WriteMassageAsError(r, "loadMailTime")
			twoTimes=&TwoTimes{
				DateEmails: time.Now(),
				DateNotify: time.Now(),
			}
		}
	}()
	stringConfig := h.ReturnTrimFile(dir+"mail.lock")
	err := json.Unmarshal([]byte(stringConfig), &twoTimes)
	if err != nil {
		panic(err)
	}
}