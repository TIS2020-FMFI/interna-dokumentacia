package connection_database

import (
	"fmt"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"log"
	"net/http"
	"strings"
	h "tisko/helper_func"
)

var (
	Db       *gorm.DB
	myRouter *mux.Router
	homePageString string
)

func Start() {
	myRouter.HandleFunc("/", homePage)
	port := h.ReturnTrimFile("./config/port.txt")
	homePageString=getAllPages()
	fmt.Println("Listen on "+port)
	log.Fatal(http.ListenAndServe(port, myRouter))
}

func getAllPages() string {
	var result strings.Builder
	_ = myRouter.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		t, err := route.GetPathTemplate()
		if err != nil {
			return err
		}
		result.WriteString(fmt.Sprintln(t))
		return nil
	})
	return result.String()
}

func homePage(writer http.ResponseWriter, request *http.Request) {
	_, _ = writer.Write([]byte(homePageString))
}