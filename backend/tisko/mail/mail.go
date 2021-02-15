package mail

import (
	"fmt"
	"github.com/gomail"
	con "tisko/connection_database"
	h "tisko/helper"
)

func sendEmails() {
	sendSuperior()
	sendEmployee()
}

func sendEmployee() {
	var emails []normSignEmail
	con.Db.Raw(queryEmployeeEmails).Find(&emails)
	for i := 0; i < len(emails); i++ {
		if emails[i].Email == "" {
			continue
		}
		email := emailNameLinkMessange{
			[]string{emails[i].Email},
			emails[i].Name,
			emails[i].Link,
			configuration.MessageDoc,
		}
		sendEmail(email)
	}
}

type emailNameLinkMessange struct {
	emails   []string
	name     string
	link     string
	massange string
}

func sendEmail(ee emailNameLinkMessange) {
	if len(ee.emails)==0 {
		return
	}
	m := gomail.NewMessage()
	addresses := make([]string,0, len(ee.emails))
	for i := 0; i < len(ee.emails); i++ {
		addresses = append(addresses, m.FormatAddress(ee.emails[i], "noreply"))
	}
	m.SetAddressHeader("From", configuration.From, "noreply")
	m.SetHeader("To",
		addresses...,
	)
	msg := fmt.Sprint(ee.massange, " ", ee.name, "-", ee.link)
	m.SetHeader("Subject", "mail")
	m.SetBody("text/plain", msg)

	d := gomail.NewPlainDialer(configuration.SmtpHost, configuration.SmtpPort, configuration.From, configuration.Password)
	err := d.DialAndSend(m)
	if  err != nil {
		fmt.Println(err)
	}
}

func SendFistMail(mails []h.TwoEmails, combinations h.StringsBool) {
	emploE, manageE := getTupleEmails(mails)
	ee := emailNameLinkMessange{
		emails:   emploE,
		name:     combinations.Name,
		link:     combinations.Link,
		massange: configuration.MessageNewDoc,
	}
	sendEmail(ee)
	if combinations.RequireSuperior {
		ee = emailNameLinkMessange{
			emails:   manageE,
			name:     combinations.Name,
			link:     combinations.Link,
			massange: "like manager: " + configuration.MessageNewDoc,
		}
		sendEmail(ee)
	}
}

func getTupleEmails(mails []h.TwoEmails) ([]string, []string) {
	EmployeeEmail := make([]string, 0, len(mails))
	ManagerEmail := make([]string, 0, len(mails))
	for i := 0; i < len(mails); i++ {
		EmployeeEmail = append(EmployeeEmail, mails[i].EmployeeEmail)
		ManagerEmail = append(ManagerEmail, mails[i].ManagerEmail)
	}
	return EmployeeEmail, ManagerEmail
}
func sendSuperior() {
	var emails []superiorSignEmail
	con.Db.Raw(querySuperiorEmails).Find(&emails)
	for i := 0; i < len(emails); i++ {
		if emails[i].Email == "" {
			continue
		}
		email := emailNameLinkMessange{
			[]string{emails[i].Email},
			emails[i].Name,
			emails[i].Link,
			configuration.MessageNewDocManager+emails[i].getFormat(),
		}
		sendEmail(email)
	}
}
