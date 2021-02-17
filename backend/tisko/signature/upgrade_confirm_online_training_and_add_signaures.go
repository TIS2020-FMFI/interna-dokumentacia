package signature

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"time"
	con "tisko/connection_database"
	h "tisko/helper"
	"tisko/training"
)

func updateConfirm(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer tx.Rollback()
	if con.SetHeadersReturnIsContunue(writer, request) {
		var (
			newTraining training.OnlineTraining
		)
		e := json.NewDecoder(request.Body).Decode(&newTraining)
		if e != nil {
			h.WriteErrWriteHaders(e, writer)
			return
		}
		newTraining.Edited = false
		result := tx.Updates(&newTraining)
		if result.Error != nil {
			h.WriteErrWriteHaders(result.Error, writer)
			return
		}
		err := confirmInDb(newTraining, tx)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		carrySignToTraining(newTraining, tx, writer)
	}
}

func confirmInDb(newTraining training.OnlineTraining, tx *gorm.DB) error {
	result := tx.Model(&newTraining).Updates(map[string]interface{}{"edited": false})
	return result.Error
}

func carrySignToTraining(newTraining training.OnlineTraining, tx *gorm.DB, writer http.ResponseWriter) {
	err := saveSignToTraining(newTraining, tx)
	if err != nil {
		h.WriteErrWriteHaders(err, writer)
		return
	}
	tx.Commit()
	con.SendAccept(newTraining.Id, writer)
}

func saveSignToTraining(newTraining training.OnlineTraining, tx *gorm.DB) error {
	signs := createOnlineSigns(newTraining)
	result := tx.Create(&signs)
	return result.Error
}

func confirm(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer tx.Rollback()
	if con.SetHeadersReturnIsContunue(writer, request) {
		idString, ok := mux.Vars(request)["id"]
		if !ok {
			h.WriteErrWriteHaders(fmt.Errorf("not found 'id'"), writer)
		}
		id, err := strconv.ParseUint(idString, 10, 64)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		var (
			newTraining training.OnlineTraining
		)
		result := tx.First(&newTraining, id)
		if result.Error != nil {
			h.WriteErrWriteHaders(result.Error, writer)
			return
		}
		err = confirmInDb(newTraining, tx)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		carrySignToTraining(newTraining, tx, writer)
	}
}
func createOnlineSigns(training training.OnlineTraining) []OnlineTrainingSignature {
	arrayIdEmployees := h.FromStringToArrayUint64(training.IdEmployees)
	signs := make([]OnlineTrainingSignature, 0, len(arrayIdEmployees))

	for i := 0; i < len(arrayIdEmployees); i++ {
		signs = append(signs, OnlineTrainingSignature{
			EmployeeId: arrayIdEmployees[i],
			TrainingId: training.Id,
			Date: sql.NullTime{
				Time:  time.Now(),
				Valid: false,
			},
		})
	}
	return signs
}
