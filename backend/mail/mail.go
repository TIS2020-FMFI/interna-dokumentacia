package mail

import (
	"fmt"
	"net/smtp"
	con "tisko/connection_database"
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
		auth := smtp.PlainAuth("",
			configuration.From, configuration.Password, configuration.SmtpHost)

		// Sending email.
		err := smtp.SendMail(configuration.SmtpHost+":"+configuration.SmtpPort,
			auth, configuration.From,[]string{ emails[i].Email},
			[]byte(configuration.MessageDoc+emails[i].Name+ " - "+emails[i].Link))
		if err != nil {
			fmt.Println(err)
			continue
		}
		fmt.Println("Email Sent Successfully!")
	}
}

func sendSuperior() {

}