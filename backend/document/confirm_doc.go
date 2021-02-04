package document

import (
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	comb "tisko/combination"
	con "tisko/connection_database"
	h "tisko/helper"
)

var (
	confirm string
)

func confirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer h.IfRecoverRollBack(tx, writer)
	if con.SetHeadersReturnIsContunue(writer, request) {
		id, err := strconv.ParseUint(mux.Vars(request)["id"],10,64)
		if err != nil || id<0 {
			http.Error(writer, "must give number > 0", http.StatusInternalServerError)
			return
		}
		doConfirm(id, tx, writer)
		con.SendAccept(id, writer)
	}
}

func doConfirm(id uint64, tx *gorm.DB, writer http.ResponseWriter) {
	var respon h.StringBool
	tx.Raw(confirm, id).Find(&respon)
	com, err := comb.GetCombinations(respon)
	if err != nil {
		http.Error(writer, "error at give sign to doc", http.StatusInternalServerError)
		panic("error at give sign to doc")
	}
	val := h.IntBool{
		Int0:  id,
		Bool0: respon.Whether,
	}
	AddSignature(com, val, tx)
	tx.Commit()
}
