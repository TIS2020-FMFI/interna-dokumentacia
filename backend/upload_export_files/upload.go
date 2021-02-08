package upload_export_files

import (
	"io"
	"net/http"
	"os"
	con "tisko/connection_database"
	h "tisko/helper"
	path "tisko/paths"
)

const (
	dir = "imports"
)

func AddHandle() {
	con.AddHeaderPost(path.File, upload)
}

func upload(writer http.ResponseWriter, request *http.Request) {
		_ = request.ParseMultipartForm(10 << 30)
		file, fileHeader, err := request.FormFile("file")
		if err != nil {
			http.Error(writer, "must give me file with key \"file\"", http.StatusInternalServerError)
			return
		}
		h.MkdDirIfNotExist(dir)
		f, err := os.OpenFile("./"+dir+"/"+fileHeader.Filename, os.O_WRONLY|os.O_CREATE, 77770)
		if err == nil {
			_,err = io.Copy(f, file)
			if err == nil {
				con.SendAccept(0,writer)
			}
			f.Close()
		}
		_ = file.Close()
}