package signature

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"net/http"
	con "tisko/connection_database"
)

func GetSignatures(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer,request)  {
		params := mux.Vars(request)
		var (
			signatures = &Signatures{}
		)
		query :=params["id"]
		setOnlineSign(query, signatures)
		setSuperiorSign(query, signatures)
		setDocumentSign(query, signatures)


		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(writer).Encode(signatures)
	}

}

func setDocumentSign(query string, signatures *Signatures) {
	join := "JOIN document_signatures on document_signatures.id = documents.id"
	select0 := "document_signatures.*, documents.*"
	where:= "employee_id="+query+" and e_date IS NULL"+
		" and not exists(select * from cancel_signs where document_signature_id=document_signatures.id)"
	db := prepareDb(join, select0, where)
	db.Table("documents").Find(&signatures.DocumentSignature)
}

func setSuperiorSign(query string, signatures *Signatures) {
	join := "JOIN document_signatures on document_signatures.employee_id = employees.id " +
		"JOIN documents on document_signatures.id = documents.id"
	select0 :="document_signatures.*, \"employees\".*, documents.* "
	where:= "superior_id="+query+" and s_date IS NULL"+
		" and not exists(select * from cancel_signs where document_signature_id=document_signatures.id)"
	db := prepareDb(join, select0, where)
	db.Table("employees").Find(&signatures.EmployeeSignature)
}

func setOnlineSign(query string, signatures *Signatures) {
	join :="JOIN online_trainings on online_trainings.id = online_training_signatures.training_id"
	select0 :="online_trainings.*, online_training_signatures.*"
	where:= "employee_id="+query+" and \"online_training_signatures\".date IS NULL"
	db := prepareDb(join, select0, where)
	db.Table("online_training_signatures").Find(&signatures.OnlineSignature)
}

func prepareDb(join string, select0 string, where string) *gorm.DB {
	db := con.Db.Joins(join)
	db = db.Select(select0)
	db = db.Where(where)
	return db
}
/*
db = con.Db.Joins("JOIN document_signatures on " +
			"document_signatures.employee_id = employees.id")
		db = db.Select("document_signatures.*, \"employees\".*")
		db = db.Where("superior_id="+query+" and s_date IS NULL")
		db.Table("employees").Find(&signatures.EmployeeSignature)
 */