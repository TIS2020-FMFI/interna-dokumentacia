package mail

import (
	"fmt"
	"net/smtp"
	con "tisko/connection_database"
	h "tisko/helper"
)

func sendEmails() {
	sendSuperior()
	//sendEmployee()
}

func sendEmployee() {
	var emails []normSignEmail
	con.Db.Raw(queryEmployeeEmails).Find(&emails)
	for i := 0; i < len(emails); i++ {
		if emails[i].Email=="" {
			continue
		}
		email := emailNameLinkMessange{
			emails[i].Email,
			emails[i].Name,
			emails[i].Link,
			configuration.MessageDoc,
		}
		sendEmail(email)
	}
}

type emailNameLinkMessange struct {
email string
name string
link string
massange string
}

func sendEmail(ee emailNameLinkMessange) {

	auth := smtp.PlainAuth("",
		configuration.From, configuration.Password, configuration.SmtpHost)

	// Sending email.
	err := smtp.SendMail(configuration.SmtpHost+":"+configuration.SmtpPort,
		auth, configuration.From,[]string{ ee.email },
		[]byte(ee.massange+ee.name+ " - "+ee.link))
	if err != nil {
		fmt.Println(err)
	}
}
func SendFistMail(mails []h.TwoEmails, combinations h.StringsBool) {
	//mails.EmployeeEmail
	//ee := emailNameLinkMessange{
	//	email:  ,
	//	name:     "",
	//	link:     "",
	//	massange: "",
	//}
	
}
func sendSuperior() {

}