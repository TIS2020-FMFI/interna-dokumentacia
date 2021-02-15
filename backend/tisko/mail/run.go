package mail

import (
	"encoding/json"
	"os"
	"time"
)

func RunMailSenders() {
	go clockControl()
}

func InitVars()  {
	init0()
}

func clockControl() {
	lastDate :=numTime.date
	now := time.Now()
	if now.Sub(lastDate)> day || debug{
		upgrade()
	}
	tomorovAt01Hour := time.Date(now.Year(), now.Month(),
		now.Day()+1,01,0,0,0,time.UTC)
	time.Sleep(tomorovAt01Hour.Sub(now))
	for  {
		upgrade()
		time.Sleep(day)
	}
}

func upgrade() {
	sendEmails()
	sendNotifications()
	writeTime()
}

func writeTime() {
	numTime.number++
	numTime.date=time.Now()
	file,err := os.Create(path)
	if  err!= nil {
		return
	}
	b, err := json.Marshal(numTime)
	_, _ = file.Write(b)
	file.Close()
}