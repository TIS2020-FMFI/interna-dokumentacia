package mail

import (
	"encoding/json"
	"os"
	"time"
	h"tisko/helper"
	"tisko/tiker"
)

func InitMailSenders() {
	clockControl()
}

func InitVars()  {
	init0()
}

func clockControl() {
	dayHour := 24
	go initJob()
	tiker.AddNewJob(upgradeEmails, dayHour, h.DurationToTomorow())
	tiker.AddNewJob(updatenotify, dayHour, h.DurationToTomorow())
}

func initJob() {
	now := time.Now()
	if now.Sub(twoTimes.DateEmails)> day || debug{
		upgradeEmails()
		sendNotifications()
	}
}

func updatenotify() {
	//	sendNotifications()
}

func upgradeEmails() {
//	sendEmails()
	writeTimeEmails()
}

func writeTimeEmails() {
	file,err := os.Create(path)
	if  err!= nil {
		return
	}
	b, err := json.Marshal(twoTimes)
	_, err = file.Write(b)
	file.Close()
}