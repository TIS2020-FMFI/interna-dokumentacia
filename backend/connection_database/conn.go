package connection_database

import (
	"fmt"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"log"
	"net/http"
	h "tisko/helper_func"
)

var (
	Db       *gorm.DB
	myRouter *mux.Router
)

func Start() {
	myRouter.HandleFunc("/", homePage)
	port := h.ReturnTrimFile("./config/port.txt")
	fmt.Println("Listen on "+port)
	log.Fatal(http.ListenAndServe(port, myRouter))
}

func homePage(writer http.ResponseWriter, request *http.Request) {
	_, _ = writer.Write([]byte("home page"))
}
