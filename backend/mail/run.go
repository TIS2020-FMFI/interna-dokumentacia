package mail

import (
	"encoding/json"
	"time"
	h "tisko/helper"
)

const (
	day = time.Hour*24
)

var (
	configuration *config
)

func RunMailSenders() {
	loadConfig()
	go clockControl()
}

func loadConfig() {
	stringConfig := h.ReturnTrimFile("./config/mail_config.txt")
	err := json.Unmarshal([]byte(stringConfig), &configuration)
	h.Check(err)
}

func clockControl() {
	lastDate := readLastDate()
	now := time.Now()
	if now.Sub(lastDate)> day {
		sendEmail()
	}
	tomorovAt01Hour := time.Date(now.Year(), now.Month(),
		now.Day()+1,01,0,0,0,time.UTC)
	time.Sleep(tomorovAt01Hour.Sub(now))
	for  {
		sendEmail()
		upgradeMailDate()
		time.Sleep(day)
	}
}
func readLastDate() time.Time {

	return time.Now()
}

func upgradeMailDate() {

}
