package document

import (
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
	comb "tisko/combination"
	con "tisko/connection_database"
	h "tisko/helper_func"
)

var (
	confirm string
)

func confirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer h.IfRecoverRollBack(tx)
	if con.SetHeadersReturnIsContunue(writer, request) {
		id, err := strconv.Atoi(mux.Vars(request)["id"])
		if err != nil || id<0 {
			http.Error(writer, "must give number > 0", http.StatusInternalServerError)
			return
		}
		var assignedTo string
		tx.Raw(confirm, id).Find(&assignedTo)
		com, err := comb.GetCombinations(assignedTo)
		if err != nil {
			http.Error(writer, "error at give sign to doc", http.StatusInternalServerError)
			panic("error at give sign to doc")
		}
		AddSignature(com, id, tx)
		tx.Commit()
	}
}
