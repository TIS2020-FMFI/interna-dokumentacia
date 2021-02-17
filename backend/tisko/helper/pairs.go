package helper

import (
	"fmt"
	"net/http"
)


type TwoEmails struct {
	EmployeeEmail string`gorm:"column:e_email" json:"e_email"`
	ManagerEmail string `gorm:"column:m_email" json:"m_email"`
}

type IntBool struct {
	Int0 uint64
	Bool0 bool
}

type RquestWriter struct {
	W http.ResponseWriter
	R *http.Request
}

type DataWR struct {
	S *MyStrings
	RW *RquestWriter
}

type SignsSkillMatrix struct {
	Cancel string `json:"cancel"`
	Resign string `json:"resign"`
}

type PasswordConfig struct {
	KioskPasswordFree    bool `json:"kiosk_password_free"`
	InternetPasswordFree bool `json:"internet_password_free"`
}
const (
	NameColumn     = "login"
	PasswordColumn = "password"
	Email          = "email"
)
func (rw *DataWR) BuildQuery(Config *PasswordConfig) {
	b := Config.KioskPasswordFree
	if rw.S.First == Email {
		b=Config.InternetPasswordFree
	}
	name,passwd := rw.getNamePassword()
	var query string
	if b {
		query=fmt.Sprint(rw.S.First,"='", name,"'")
	}else {
		query=fmt.Sprint(rw.S.First,"='", name, "' and ",
			rw.S.Second,"=", passwd,"::varchar")
	}
	rw.S.Query=query
}

func (rw *DataWR) getNamePassword() (string, string) {
	name := rw.RW.R.FormValue(rw.S.First)
	passwd := rw.RW.R.FormValue(rw.S.Second)
	fmt.Println(name, passwd)
	return name, passwd
}
