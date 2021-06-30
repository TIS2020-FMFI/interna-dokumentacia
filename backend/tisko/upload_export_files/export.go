package upload_export_files

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"os"
	"strconv"
	h "tisko/helper"
	"tisko/signature"
)

//exportFile handle for release skill-matrix according:
//  - id of superior
//  - format of output
func exportFile(writer http.ResponseWriter, request *http.Request) {
	name,format, err := exportSkillMatrixReturnNameFormat(request)
	if err != nil {
		h.WriteErrWriteHandlers(err, writer)
		return
	}
	nameFormat := h.MyStrings{
		First:  name,
		Second: format,
	}
	if err := h.CopyFile(writer, nameFormat); nil != err {
		h.WriteErrWriteHandlers(err, writer)
		return
	}
}

//exportSkillMatrixReturnNameFormat do:
//  - fetch id and format
//  - run python script
//  - return name and format or error
func exportSkillMatrixReturnNameFormat(request *http.Request) (string,string,error) {
	map0 := mux.Vars(request)
	id, okId:= map0["id"]
	format, okFormat := map0["format"]
	if !okId || !okFormat {
		return "","", fmt.Errorf("do not contains id or format, it must contains both")
	}
	h.MkDirIfNotExist(h.Exports)
	e := saveJson(id)
	if e != nil {
		return "","",e
	}
	name, err := h.RunPythonScript( "export.py", id, format)
	if err != nil {
		return "","",err
	}
	return fmt.Sprint(name), format, nil
}

//saveJson fetch skill-matrix from database and save to json
func saveJson(s string) error {
	id, err := strconv.ParseUint(s,10,64)
	if err != nil || id == 0 {
		return  err
	}
	modify := signature.FetchMatrix(id)

	file, err := os.Create(fmt.Sprint(imports,"/", dirJson, "/",id,".json"))
	if err != nil {
		return  err
	}
	b, err := json.Marshal(modify)
	if err != nil {
		file.Close()
		return  err
	}
	_, err = file.Write(b)
	if err != nil {
		file.Close()
		return  err
	}
	err = file.Close()
	return err
}
