package helper

import (
	"log"
	"net/http"
	"os"
)

// WriteErrWriteHandlers write error to gefko.log and send StatusInternalServerError - code 500
func WriteErrWriteHandlers(e error, writer http.ResponseWriter) {
	WriteErr(e)
	http.Error(writer, e.Error(), http.StatusInternalServerError)
}

// Check if not error nil(null) end whole program with panic
func Check(e error) {
	if e != nil {
		panic(e)
	}
}

// WriteErr write to gefko.log
func WriteErr(r interface{}) {
	f, err := os.OpenFile("gefko.log", os.O_RDWR | os.O_CREATE | os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()
	log.SetOutput(f)
	log.Println(r)
}
