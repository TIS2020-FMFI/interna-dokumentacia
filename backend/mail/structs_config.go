package mail

import "time"

type config struct {
	From            string `json:"from"`
	Password        string `json:"password"`
	SmtpHost        string `json:"smtpHost"`
	SmtpPort        string `json:"smtpPort"`
	MessageDoc      string `json:"message_doc"`
	MessageTraining string `json:"message_training"`
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
	EmployeeId uint64 `gorm:"column:employee_id"`
	FirstName  string `gorm:"column:first_name"`
	LastName   string `gorm:"column:last_name"`
}
type normSignEmail struct {
	Email      string `gorm:"column:email"`
	Name       string `gorm:"column:name"`
	Link       string `gorm:"column:link"`
}