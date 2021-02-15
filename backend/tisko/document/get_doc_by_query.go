package document

import (
	"encoding/json"
	con "tisko/connection_database"
	h "tisko/helper"
)

func sendDocByQuery(query string, rw h.RquestWriter) {
	if con.SetHeadersReturnIsContunue(rw.W, rw.R) {
		var docs []Document
		re := con.Db.Raw(query).Find(&docs)
		if docs == nil {
			h.WriteErrWriteHaders(re.Error, rw.W)
			return
		}
		con.HeaderSendOk(rw.W)
		_ = json.NewEncoder(rw.W).Encode(docs)
	}
}
