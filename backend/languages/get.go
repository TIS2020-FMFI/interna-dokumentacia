package languages

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	con "tisko/connection_database"
	h "tisko/helper"
	path "tisko/paths"
)

const (
	dir = "./languages/"
)

func AddHandle() {
	con.AddHeaderGet(path.AllLanguages, listAll)
	con.AddHeaderGet(fmt.Sprint(path.Language, "{name}"), readOne)
}

func listAll(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		files := make([]string,0, 10)
		err := filepath.Walk(dir, visit(&files))
		if err != nil || len(files) == 0 {
			http.Error(writer, "error at find languages", http.StatusInternalServerError)
			return
		}
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(files)
	}
}

func visit(files *[]string) filepath.WalkFunc {
	return func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatal(err)
		}
		x := strings.Split(info.Name(), ".")
		if len(x)==2 && strings.EqualFold(x[1],"txt"){
			*files = append(*files, x[0])
		}
		return nil
	}
}

func readOne(writer http.ResponseWriter, request *http.Request) {
	map0 := mux.Vars(request)
	defer func() {
		if r := recover(); r != nil {
			http.Error(writer, "error at find language", http.StatusInternalServerError)
		}
	}()
	file := h.ReturnTrimFile(fmt.Sprint(dir, map0["name"], ".txt"))

	var data map[string]string
	if err := json.Unmarshal([]byte(file), &data); err != nil {
		http.Error(writer, "error at parse language", http.StatusInternalServerError)
		return
	}
	con.HeaderSendOk(writer)
	_ = json.NewEncoder(writer).Encode(data)

}
