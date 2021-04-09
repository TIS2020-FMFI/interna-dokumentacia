package document

import (
	"encoding/json"
	"fmt"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func aktualDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		docs := getCompletnessByQuery(actualDoc, writer)
		if docs != nil {
			con.HeaderSendOk(writer)
			_ = json.NewEncoder(writer).Encode(docs)
		}else {
			h.WriteErrWriteHaders(fmt.Errorf("docs is nul"), writer)
		}
	}
}
