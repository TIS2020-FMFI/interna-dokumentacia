package employee

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)
var (
	 passwd *h.PasswordConfig
)

func loginBy(rw h.DataWR) {
	rw.BuildQuery(passwd)
	var e Employee
	re := con.Db.Where(rw.S.Query).First(&e)
	if re.Error!=nil {
		http.Error(rw.RW.W, re.Error.Error(), http.StatusInternalServerError)
		return
	}
	con.HeaderSendOk(rw.RW.W)
	_ = json.NewEncoder(rw.RW.W).Encode(e)

}

func init0() {
	stringConfig := h.ReturnTrimFile("./config/password_allow.txt")
	err := json.Unmarshal([]byte(stringConfig), &passwd)
	h.Check(err)
}