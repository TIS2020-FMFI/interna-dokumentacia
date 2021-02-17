package connection_database

import (
	"fmt"
	"log"
	"net/http"
	h "tisko/helper"
)

func Start() {
	myRouter.HandleFunc("/", homePage).Methods("GET")
	port := h.ReturnTrimFile("./config/port.txt")
	fmt.Println("Listen on "+port)
	inithomePageString()
	log.Fatal(http.ListenAndServe(port, myRouter))
}
