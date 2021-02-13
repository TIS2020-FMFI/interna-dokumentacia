package upload_export_files

import (
	"fmt"
	"github.com/gorilla/mux"
	"io"
	"net/http"
	"os"
	"strconv"
	h "tisko/helper"
)

func export(writer http.ResponseWriter, request *http.Request) {
	name, err := exportSkillMatrixReturnName(request)
	if err != nil {
		http.Error(writer, "must give number > 0", http.StatusInternalServerError)
		return
	}
	fpath := "./"+ "exports" +"/" + name
	if err := servefile(writer, fpath); nil != err {
		http.Error(writer, "must give me file with key \"file\"", http.StatusInternalServerError)
		return
	}
}

func exportSkillMatrixReturnName(request *http.Request) (string,error) {
	map0 := mux.Vars(request)
	id, err := strconv.ParseUint(map0["id"],10,64)
	if err != nil {
		return "", err
	}
	//To Do
	h.MkdDirIfNotExist("exports")
	return fmt.Sprint("export", id,".", map0["format"]), nil
}

func servefile(writer http.ResponseWriter, fpath string) (err error) {
	outfile, err := os.OpenFile(fpath, os.O_RDONLY, 0x0444)
	if nil != err {
		return
	}
	_, err = io.Copy(writer, outfile)
	return
}