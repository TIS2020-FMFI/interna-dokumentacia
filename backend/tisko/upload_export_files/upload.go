package upload_export_files

import (
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strings"
	con "tisko/connection_database"
	h"tisko/helper"
	"tisko/mail"
	"tisko/signature"
)

func upload(writer http.ResponseWriter, request *http.Request) {
		_ = request.ParseMultipartForm(10 << 30)
		file, fileHeader, err := request.FormFile("file")
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
    	division :=request.FormValue("division")
		pathName := carryPathName(fileHeader, division )
		success := saveFile(file, pathName)
	if success {
		con.SendAccept(0,writer)
	}else {
		h.WriteErrWriteHaders(fmt.Errorf("not sussces save"), writer)

	}
		_ = file.Close()
}

func carryPathName(fileHeader *multipart.FileHeader, division string) string {
	if len(division)!=0 {
		return fmt.Sprint("./",imports,"/", divisions, "/",division,".",getFormat(fileHeader.Filename))
	}
	return fmt.Sprint("./",imports,"/", card, "/",division,".",getFormat(fileHeader.Filename))
}

func getFormat(filename string) string{
	field := strings.Split(filename,".")
	return field[len(field)-1]
}

func saveFile(file multipart.File, pathName string) bool {
	f, err := os.OpenFile(pathName, os.O_WRONLY|os.O_CREATE, 77770)
	if err == nil {
		_,err = io.Copy(f, file)
		if err == nil {
			go parseUpload(pathName)
			return true
		}
		f.Close()
	}
	return false
}

func parseUpload(pathName string) {
	pathResult, err := runScript(pathName, "csv", "import.py")
	if err!=nil {
		h.WriteErr(err)
		return
	}
	defer h.DontPanicLogFile()
	newEmployeesString := h.ReturnTrimFile(pathResult)
	var newEmployees []h.NewEmployee
	err = json.Unmarshal([]byte(newEmployeesString), &newEmployees)
	if err != nil {
		h.WriteErr(err)
		return
	}
	var emailsEmployees,err0 = signature.AddSignsNewEmployeesReturnsEmails(newEmployees)
	if err0 != nil {
		h.WriteErr(err0)
		return
	}
	mail.SendWelcome(emailsEmployees)
}