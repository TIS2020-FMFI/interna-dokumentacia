package mail

type config struct {
	From            string `json:"from"`
	Password        string `json:"password"`
	SmtpHost        string `json:"smtpHost"`
	SmtpPort        string `json:"smtpPort"`
	MessageDoc      string `json:"message_doc"`
	MessageTraining string `json:"message_training"`
}