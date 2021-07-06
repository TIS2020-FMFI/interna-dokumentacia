package helper

import (
	"log"
	"net/http"
	"os"
)

// WriteErrWriteHandlers write error to gefko.log and send StatusInternalServerError - code 500
func WriteErrWriteHandlers(e error,  location string, writer http.ResponseWriter) {
	WriteMassageAsError(e, location)
	http.Error(writer, e.Error(), http.StatusInternalServerError)
}

// Check if not error nil(null) end whole program with panic
func Check(e error) {
	if e != nil {
		panic(e)
	}
}

// WriteMassageAsError write to gefko.log
func WriteMassageAsError(massange interface{}, location string) {
	f, err := os.OpenFile("gefko.log", os.O_RDWR | os.O_CREATE | os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("in function %v was occured this error: %v", location, err)
	}
	defer f.Close()
	log.SetOutput(f)
	log.Printf("in function %v was occured this error: %v\n\n", location, massange)
}
