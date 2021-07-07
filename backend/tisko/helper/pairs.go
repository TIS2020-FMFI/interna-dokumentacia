package helper

import (
	"fmt"
	"net/http"
	"strings"
)

// TwoEmails pair of strings:
//  - EmployeeEmail (map on "e_email" in SQL, JSON)
//  - ManagerEmail (map on "m_email" in SQL, JSON)
type TwoEmails struct {
	EmployeeEmail string`gorm:"column:e_email" json:"e_email"`
	ManagerEmail string `gorm:"column:m_email" json:"m_email"`
}

// NameId pair of
//- Id (map on "id" in SQL)
//- Name (map on "name" in SQL)
type NameId struct {
	Id uint64 `gorm:"column:id"`
	Name string `gorm:"column:name"`
}

// RquestWriter pair of handler argument:
//- W  http.ResponseWriter
//- R *http.Request
type RquestWriter struct {
	W http.ResponseWriter
	R *http.Request
}

// DataWR pair:
//- S *MyStrings
//- RW *RquestWriter
type DataWR struct {
	S *MyStrings
	RW *RquestWriter
}

// SignsSkillMatrix pair for read ids in strings "1,2,5,10" from JSON
//- Cancel (map to "cancel" in json)
//- Resign (map to "resign" in json)
type SignsSkillMatrix struct {
	Cancel string `json:"cancel"`
	Resign string `json:"resign"`
}

// PasswordConfig pair of config allowing without password
type PasswordConfig struct {
	KioskPasswordFree    bool `json:"kiosk_password_free"`
	InternetPasswordFree bool `json:"internet_password_free"`
}
const (
	Card           = "card"
	PasswordColumn = "password"
	Login          = "login"
)

// BuildQuery build command to SQL find employee by name and password(password can be skip according Config *PasswordConfig)
// and command save to "self.S.Query"
func (rw *DataWR) BuildQuery(Config *PasswordConfig) {
	b := Config.KioskPasswordFree
	if rw.S.First == Login {
		b=Config.InternetPasswordFree
	}
	name,passwd := rw.getNamePassword()
	var query strings.Builder
	query.WriteString(fmt.Sprint("LOWER(",rw.S.First,") ='", name, "'"))
	if !b {
		query.WriteString(fmt.Sprint(" and LOWER(",rw.S.Second,") = '", passwd,"'::varchar"))
	}
	query.WriteString(" and (deleted is null or deleted = false)")
	rw.S.Query=query.String()
}

// getNamePassword select name and password from request in rw
func (rw *DataWR) getNamePassword() (string, string) {
	name := rw.RW.R.FormValue(rw.S.First)
	passwd := rw.RW.R.FormValue(rw.S.Second)
	return strings.ToLower(name), strings.ToLower(passwd)
}
