package upload_export_files

import (
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	con "tisko/connection_database"
)

func upload(writer http.ResponseWriter, request *http.Request) {
		_ = request.ParseMultipartForm(10 << 30)
		file, fileHeader, err := request.FormFile("file")
		if err != nil {
			http.Error(writer, "must give me file with key \"file\"", http.StatusInternalServerError)
			return
		}
		path := carryPath(fileHeader)
		success := saveFile(file, path)
	if success {
		con.SendAccept(0,writer)
	}
		_ = file.Close()
}

func carryPath(fileHeader *multipart.FileHeader) string {
	division := fileHeader.Header.Get("divisions")
	if len(division)!=0 {
		return fmt.Sprint("./",imports,"/", divisions, "/",fileHeader.Filename)
	}
	return fmt.Sprint("./",imports,"/", card, "/",fileHeader.Filename)
}

func saveFile(file multipart.File, path string) bool {
	f, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE, 77770)
	if err == nil {
		_,err = io.Copy(f, file)
		if err == nil {
			go parseUpload(path)
			return true
		}
		f.Close()
	}
	return false
}

func parseUpload(path string) {

	//Pato
}