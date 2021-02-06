package send_recieve_files

import (
	"io"
	"net/http"
	"os"
	con "tisko/connection_database"
	path "tisko/paths"
)

func AddHandle() {
	con.AddHeaderPost(path.File, upload)
}

func upload(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer,request) {
		_ = request.ParseMultipartForm(10 << 30)
		file, fileHeader, err := request.FormFile("file")
		if err != nil {
			http.Error(writer, "must give me file with key \"import\"", http.StatusInternalServerError)
			return
		}
		f, err := os.OpenFile("./imports/"+fileHeader.Filename, os.O_WRONLY|os.O_CREATE, 77770)
		if err == nil {
			_,err = io.Copy(f, file)
			if err == nil {
				con.SendAccept(0,writer)
			}
			f.Close()
		}
		_ = file.Close()
	}
}