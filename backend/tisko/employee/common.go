package employee

import (
	"encoding/json"
	con "tisko/connection_database"
	h "tisko/helper"
)
var (
	 passwd *h.PasswordConfig
	 queryAllEmployees string
)

func loginBy(rw h.DataWR) {
	rw.BuildQuery(passwd)
	var e Employee
	re := con.Db.Where(rw.S.Query).First(&e)
	if re.Error!=nil {
		h.WriteErrWriteHaders(re.Error, rw.RW.W)
		return
	}
	con.HeaderSendOk(rw.RW.W)
	_ = json.NewEncoder(rw.RW.W).Encode(e)

}

func init0() {
	stringConfig := h.ReturnTrimFile("./config/password_allow.txt")
	err := json.Unmarshal([]byte(stringConfig), &passwd)
	h.Check(err)
	queryAllEmployees = h.ReturnTrimFile("./config/all_employees.txt")
}