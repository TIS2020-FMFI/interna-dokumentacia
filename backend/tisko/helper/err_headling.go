package helper

import (
	"log"
	"net/http"
	"os"
)

func WriteErrWriteHaders(e error, writer http.ResponseWriter) {
	WriteErr(e)
	http.Error(writer, e.Error(), http.StatusInternalServerError)
}

func Check(e error) {
	if e != nil {
		panic(e)
	}
}

func DontPanicLogFile()  {
	if  r := recover(); r != nil{
		WriteErr(r)
	}
}

func WriteErr(r interface{}) {
	f, err := os.OpenFile("gefko.log", os.O_RDWR | os.O_CREATE | os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()
	log.SetOutput(f)
	log.Println(r)
}
