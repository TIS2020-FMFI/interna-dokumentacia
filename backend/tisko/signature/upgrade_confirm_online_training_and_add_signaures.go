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

func updateConfirm(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer h.IfRecoverRollBack(tx, writer)
	if con.SetHeadersReturnIsContunue(writer, request) {
		var (
			newTraining  training.OnlineTraining
			map0  map[string]interface{}
		)
		e := json.NewDecoder(request.Body).Decode(&map0)
		if e != nil {
			h.WriteErrWriteHaders(e, writer)
			return
		}
		e = json.NewDecoder(request.Body).Decode(&newTraining)
		if e != nil {
			h.WriteErrWriteHaders(e, writer)
			return
		}
		delete(map0,"id")
		result := tx.Model(&newTraining).Updates(&map0)
		if result.Error != nil {
			h.WriteErrWriteHaders(result.Error, writer)
			return
		}
		signs := createOnlineSigns(newTraining)
		result = tx.Create(&signs)
		if result.Error != nil {
			h.WriteErrWriteHaders(result.Error, writer)
			return
		}

		con.SendAccept(newTraining.Id, writer)
	}
}

func createOnlineSigns(training training.OnlineTraining) []OnlineTrainingSignature {
	arrayIdEmployees := h.FromStringToArrayUint64(training.IdEmployees)
	signs:= make( []OnlineTrainingSignature,0,len(arrayIdEmployees))

	for i := 0; i < len(arrayIdEmployees); i++ {
		signs = append(signs, OnlineTrainingSignature{
			EmployeeId: arrayIdEmployees[i],
			TrainingId: training.Id,
			Date:       sql.NullTime{
				Time:  time.Now(),
				Valid: false,
			},
		})
	}
	return signs
}