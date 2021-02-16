package languages

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io/ioutil"
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

func AddHandleInitVars() {
	con.AddHeaderGet(path.AllLanguages, listAll)
	con.AddHeaderGet(fmt.Sprint(path.Language, "{name}"), readOne)
}

func listAll(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		files := make([]string, 0, 10)
		err := filepath.Walk(dir, visit(&files))
		if err != nil || len(files) == 0 {
			h.WriteErr(fmt.Errorf(fmt.Sprint("error at find languages", err)))
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
		if len(x) == 2 && strings.EqualFold(x[1], "json") {
			*files = append(*files, x[0])
		}
		return nil
	}
}

func readOne(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		map0 := mux.Vars(request)
		language, ok := map0["name"]
		if !ok {
			h.WriteErr(fmt.Errorf("unrecognized language in label 'name'"))
			return
		}
		file, e := ioutil.ReadFile(fmt.Sprint(dir, language, ".json"))
		if e != nil {
			h.WriteErr(e)
			return
		}
		//
		//var data map[string]string
		//if err := json.Unmarshal([]byte(file), &data); err != nil {
		//	h.WriteErr(err)
		//	return
		//}
		jsonResult := string(file)
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(jsonResult)

	}
}
