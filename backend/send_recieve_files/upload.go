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
		file, fileHeader, err := request.FormFile("import")
		if err != nil {
			http.Error(writer, "must give me file with key \"import\"", http.StatusInternalServerError)
			return
		}
		defer func() {
			if file != nil {
				_ = file.Close()
			}}()

		// copy example
		f, err := os.OpenFile("./"+fileHeader.Filename, os.O_WRONLY|os.O_CREATE, 0666)
		defer func() {
			if f != nil {
				f.Close()
			}}()
		if err != nil {
			_,err = io.Copy(f, file)
			if err != nil {
				con.SendAccept(0,writer)
			}
		}
	}
}