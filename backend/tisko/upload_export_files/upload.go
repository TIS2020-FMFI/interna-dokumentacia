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

func upload(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		_ = request.ParseMultipartForm(10 << 30)
		file, fileHeader, err := request.FormFile("file")
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
    	division :=request.FormValue("import")
		pathName := carryPathName(fileHeader, division )
		success := saveFile(file, pathName)
	if success {
		con.SendAccept(0,writer)
	}else {
		h.WriteErrWriteHaders(fmt.Errorf("not sussces save"), writer)
	}
		_ = file.Close()
}
}
func carryPathName(fileHeader *multipart.FileHeader, division string) string {
	if len(division)!=0 {
		return fmt.Sprint(emploeyess,division, ".csv")
	}
	return fmt.Sprint(cards,fileHeader.Filename)
}

func saveFile(file multipart.File, pathName string) bool {
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

