package upload_export_files

import (
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strings"
	con "tisko/connection_database"
	h "tisko/helper"
)

//upload handle for uploading data to database
func upload(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		_ = request.ParseMultipartForm(10 << 30)
		file, fileHeader, err := request.FormFile("file")
		if err != nil {
			h.WriteErrWriteHandlers(err, writer)
			return
		}
		importName :=request.FormValue("import")
		pathName := carryPathName(fileHeader, importName )
		success := saveParseDeleteFile(file, pathName)
	if success {
		con.SendAccept(0,writer)
	}else {
		h.WriteErrWriteHandlers(fmt.Errorf("not sussces save"), writer)
	}
		_ = file.Close()
}
}

//carryPathName return import-path cards or employees according importName
func carryPathName(fileHeader *multipart.FileHeader, importName string) string {
	if len(importName)!=0 {
		return fmt.Sprint(employeesPath,importName, ".csv")
	}
	return fmt.Sprint(cardsPath,fileHeader.Filename)
}

//saveParseDeleteFile save run parse-csv and clean file
func saveParseDeleteFile(file multipart.File, pathName string) bool {
	if !strings.HasSuffix(pathName, ".csv") {
		return false
	}
	f, err := os.OpenFile(pathName, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 77770)
	defer h.MyCloseFileIfExist(f)
	if err == nil {
		_,err = io.Copy(f, file)
		if err == nil {
			f.Close()
			err = parse(pathName)
			go deleteFile(pathName)
			if err == nil {
				return true
			}
		}
	}
	return false
}

func deleteFile(pathName string) {
	e := os.Remove(pathName)
	if e != nil {
		h.WriteErr(e)
	}
}

