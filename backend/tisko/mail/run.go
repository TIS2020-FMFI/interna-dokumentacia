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
	go waitToWrite()
	tiker.AddNewJob(upgradeEmails, dayHour, h.DurationToTomorow())
	tiker.AddNewJob(updatenotify, dayHour, h.DurationToTomorow())
}

func initJob() {
	now := time.Now()
	if now.Sub(twoTimes.DateEmails)> day{
		upgradeEmails()
		updatenotify()
	}
}
var ch = make(chan bool)

func updatenotify() {
	sendNotifications()
	twoTimes.DateNotify=time.Now()
	ch <-true
}

func upgradeEmails() {
	sendEmails()
	twoTimes.DateEmails=time.Now()
	ch<-true
}

func waitToWrite(){
	for  {
		<-ch; <-ch
		writeTimeEmails()
	}
}

func writeTimeEmails() {
	file,err := os.Create(dir+"mail.lock")
	if  err!= nil {
		return
	}
	b, err := json.Marshal(twoTimes)
	_, err = file.Write(b)
	file.Close()
}