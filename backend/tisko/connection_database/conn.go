package connection_database

import (
	"fmt"
	"log"
	"net/http"
	h "tisko/helper"
)

func Start() {
	finishBackend()
	registerFrontend()
	startServer()
}

func finishBackend() {
	myRouter.HandleFunc("/homePageBackend", homePage).Methods("GET")
	inithomePageString()
}

func registerFrontend() {
	anonimFunc :=  func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "build_front_end/index.html")
	}
	myRouter.HandleFunc("/",anonimFunc)
	fs := http.FileServer(http.Dir("build_front_end/static/"))
	myRouter.Handle("/static/", http.StripPrefix("/static", fs))
}

func startServer() {
	portBackend := h.ReturnTrimFile("./connection_database/port.txt")
	fmt.Println("Listen on "+ portBackend)
	log.Fatal(http.ListenAndServe(portBackend, myRouter))
}