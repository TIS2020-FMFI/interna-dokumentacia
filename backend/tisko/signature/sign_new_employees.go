package signature

import (
	"fmt"
	"strings"
	con "tisko/connection_database"
	h "tisko/helper"
)

func AddSignsNewEmployees(newEmployees []h.NewEmployee) ([]string, error ){
	var (
		result []struct{email string}
		sql = prepareSqlNewEmployeesSigns(newEmployees)
	)
	re := con.Db.Raw(sql).Find(&result)
	if re.Error != nil {
		h.WriteErr(re.Error)
		return nil, fmt.Errorf(re.Error.Error())
	}
	return conver(result), nil
}

func conver(result []struct{ email string }) []string{
	email := make([]string,0,len(result))
	for i := 0; i < len(result); i++ {
		email = append(email, result[i].email )
	}
	return email
}

func prepareSqlNewEmployeesSigns(newEmployees []h.NewEmployee) string {
	sql := newEmployeesQuery
	sql= strings.ReplaceAll(sql, "ArrayId", h.GetIdsNewEmployeesSQLStringArray(newEmployees))
	sql= strings.ReplaceAll(sql, "ArrayIdSuperior", h.GetIdsSuperiorNewEmployeesSQLStringArray(newEmployees))
	sql= strings.ReplaceAll(sql, "ArrayAssignedTo", h.GetNewAssignedToEmployeesSQLStringArray(newEmployees))
	sql= strings.ReplaceAll(sql, "Length", fmt.Sprint(len(newEmployees)))
	return sql
}
