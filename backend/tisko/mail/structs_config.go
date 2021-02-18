package mail

import (
	"fmt"
	"strings"
	"time"
	"tisko/employee"
)

type config struct {
	From                 string `json:"from"`
	Password             string `json:"password"`
	SmtpHost             string `json:"smtpHost"`
	SmtpPort            int `json:"smtpPort"`
	MessageDoc           string `json:"message_doc"`
	MessageNewDoc        string `json:"message_new_doc"`
	MessageOldDoc        string `json:"message_old_doc"`
	MessageNewDocManager string `json:"message_new_doc_manager"`
	MessageTraining      string `json:"message_training"`
}

type adminEmails struct {
	Emails []string `json:"emails"`
}

type DateNumber struct {
	date time.Time
	number uint8
}
type superiorSignEmail struct {
	normSignEmail
	employee.BasicEmployee
}

func (e *superiorSignEmail) getFormat() string {
	return fmt.Sprint(" doc: ", e.Name, "link: ", e.Link,
		" who: ", e.Id,"-",e.FirstName,"-",e.LastName)
}
type normSignEmail struct {
	NameLinkDocument
	Email      string `gorm:"column:email"`
}

type NameLinkDocument struct {
	Name       string `gorm:"column:name"`
	Link       string `gorm:"column:link"`
}

func (d *NameLinkDocument) format(delitem string) string {
	return fmt.Sprint(" ", d.Name, " - ", d.Link, delitem)
}
type NameLinkDocuments []NameLinkDocument

func (d NameLinkDocuments) getMessange() string {
	var result strings.Builder
	result.WriteString(configuration.MessageOldDoc)
	for i := 0; i < len(d)-1; i++ {
		result.WriteString(d[i].format("; "))
	}
	result.WriteString(d[len(d)-1].format(""))
	return result.String()
}