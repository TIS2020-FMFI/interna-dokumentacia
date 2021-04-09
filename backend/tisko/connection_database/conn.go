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
	myRouter.HandleFunc("/homePageBackend",
		homePage).Methods("GET")
	inithomePageString()
}

func registerFrontend() {
	anonimFunc :=  func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "build_front_end/index.html")
	}
	myRouter.HandleFunc("/", anonimFunc)
	myRouter.HandleFunc("/login", anonimFunc)
	staticDir := "/build_front_end/static/"
	myRouter.
		PathPrefix("/static/").
		Handler(http.StripPrefix("/static/",
			http.FileServer(http.Dir("."+staticDir))))
}

func startServer() {
	portBackend := h.ReturnTrimFile("./connection_database/port.txt")
	fmt.Println("Listen on "+ portBackend)
	log.Fatal(http.ListenAndServe(portBackend, myRouter))
}