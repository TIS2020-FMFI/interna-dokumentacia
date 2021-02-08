package upload_export_files

import (
	"fmt"
	"io"
	"net/http"
	"os"
	con "tisko/connection_database"
	h "tisko/helper"
)

func upload(writer http.ResponseWriter, request *http.Request) {
		_ = request.ParseMultipartForm(10 << 30)
		file, fileHeader, err := request.FormFile("file")
		if err != nil {
			http.Error(writer, "must give me file with key \"file\"", http.StatusInternalServerError)
			return
		}
		h.MkdDirIfNotExist(imports)
		path := fmt.Sprint("./",imports,"/",fileHeader.Filename)
		f, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE, 77770)
		if err == nil {
			_,err = io.Copy(f, file)
			if err == nil {
				con.SendAccept(0,writer)
				go parseUpload(path) 
			}
			f.Close()
		}
		_ = file.Close()
}

func parseUpload(path string) {

	//Pato
}