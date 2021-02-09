package signature

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"
	con "tisko/connection_database"
	h "tisko/helper"
	"tisko/training"
)

func createTrainingAndSignature(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer h.IfRecoverRollBack(tx, writer)
	if con.SetHeadersReturnIsContunue(writer, request) {
		var newTraining training.OnlineTraining
		e := json.NewDecoder(request.Body).Decode(&newTraining)
		if e != nil {
			http.Error(writer, e.Error(), http.StatusInternalServerError)
			return
		}
		result := tx.Create(&newTraining)
		if result.Error != nil {
			http.Error(writer, result.Error.Error(), http.StatusInternalServerError)
			return
		}
		signs := createOnlineSigns(newTraining)
		result = tx.Create(&signs)
		if result.Error != nil {
			http.Error(writer, result.Error.Error(), http.StatusInternalServerError)
			return
		}

		con.SendAccept(newTraining.Id, writer)
	}
}

func createOnlineSigns(training training.OnlineTraining) []OnlineTrainingSignature {
	signs:= make( []OnlineTrainingSignature,0,len(training.IdEmployees))
	for i := 0; i < len(training.IdEmployees); i++ {
		signs = append(signs, OnlineTrainingSignature{
			EmployeeId: training.IdEmployees[i],
			TrainingId: training.Id,
			Date:       sql.NullTime{
				Time:  time.Now(),
				Valid: true,
			},
		})
	}
	return signs
}
