package mail

import con "tisko/connection_database"

func sendNotifications() {
	var emails NameLinkDocuments
	con.Db.Raw(oldDoc).Find(&emails)
	for i := 0; i < len(emails); i++ {
		if emails[i].Name == "" {
			continue
		}
		email := emailNameLinkMessange{
			adminMails.Emails,
			emails[i].Name,
			emails[i].Link,
			emails.getMessange(),
		}
		sendEmail(email)
	}
}