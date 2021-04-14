package employee

import (
	"encoding/json"
	"fmt"
	con "tisko/connection_database"
	h "tisko/helper"
)
var (
	 passwd *h.PasswordConfig
	 queryAllEmployees, queryFilterEmployees string
)
const dir = "./employee/"

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
	stringConfig := h.ReturnTrimFile(dir+"password_allow.txt")
	err := json.Unmarshal([]byte(stringConfig), &passwd)
	h.Check(err)
	queryAllEmployees = h.ReturnTrimFile(dir+"all_employees.txt")
	queryFilterEmployees = h.ReturnTrimFile(dir+"filter_employees.txt")
}

func ConvertToNewEmployees(employees []Employee) []h.NewEmployee {
	result := make([]h.NewEmployee,0,len(employees))
	for i := 0; i < len(employees); i++ {
		result = append(result, employees[i].ConvertToNewEmployee())
	}
	return result
}
func (e *Employee) ConvertToNewEmployee() h.NewEmployee {
	return h.NewEmployee{
		Id:         e.Id,
		SuperiorId: e.ManagerId,
		Assigned:   fmt.Sprint("%",
			"(",h.ArrayInStringToRegularExpression(fmt.Sprint(e.BranchId)),"|x); ",
			"(",h.ArrayInStringToRegularExpression(fmt.Sprint(e.CityId)),"|x); ",
			"(",h.ArrayInStringToRegularExpression(fmt.Sprint(e.DepartmentId)),"|x); ",
			"(",h.ArrayInStringToRegularExpression(fmt.Sprint(e.DivisionId)),"|x)%"),
	}
}