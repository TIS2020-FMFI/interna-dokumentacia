package connection_database

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"net/url"
	"strings"
	"time"
	h "tisko/helper"
)

const (
	timeout = time.Millisecond*450
)

var (
	myForm = url.Values{}
	staticDir = "/build_front_end/static/"
)

func Start() {
	finishBackend()
	registerFrontend()
	startServer()
}

func finishBackend() {
	myRouter.HandleFunc("/homePageBackend",
		homePage)
	inithomePageString()
}

func registerFrontend() {
	anonimFunc :=  func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "build_front_end/index.html")
	}
	myRouter.HandleFunc("/", anonimFunc)
	myRouter.HandleFunc("/login", anonimFunc)
	myRouter.HandleFunc("/records-to-sign", anonimFunc)
	myRouter.HandleFunc("/signed-records", anonimFunc)
	myRouter.HandleFunc("/add-record", anonimFunc)
	myRouter.HandleFunc("/saved-record", anonimFunc)
	myRouter.HandleFunc("/finder", anonimFunc)
	myRouter.HandleFunc("/settings", anonimFunc)
	myRouter.HandleFunc("/logout", anonimFunc)
}

func startServer() {
	portBackend := h.ReturnTrimFile("./connection_database/port.txt")
	fmt.Println("Listen on "+ portBackend)
	myForm.Add("login",  "admin")
	myForm.Add("password", "DoLi")
	myUrl := fmt.Sprint("http://localhost", portBackend,"/auth/login")
	for  {
		s := NewServer(portBackend)
		go tryIsAliveElseStop(s, myUrl)
		e := s.ListenAndServe()
		if e != nil {
			if e.Error() == "http: Server closed" {
				fmt.Println("reset")
			}else {
				h.WriteErr(e)
			}
		}
	}
}

func NewServer(port string) *http.Server {
	s := & http.Server{
		Addr: port,
		ReadTimeout:  time.Second/2,
		WriteTimeout:  time.Second*7,
	}
	cloneRouter :=mux.NewRouter().StrictSlash(true)
	temp := myRouter
	_ = temp.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		link, err := route.GetPathTemplate()
		if err != nil {
			return err
		}
		methods, err2 := route.GetMethods()
		funcHandler := route.GetHandler()
		if err2 != nil {
			cloneRouter.Path(link).Handler(funcHandler)
			return nil
		}
		cloneRouter.Methods(methods...).Path(link).Handler(funcHandler)
		return nil
	})
	cloneRouter.PathPrefix("/static/").Handler(http.StripPrefix("/static/",
			http.FileServer(http.Dir("."+staticDir))))
	s.Handler = cloneRouter
	return s
}

func tryIsAliveElseStop(s *http.Server, myUrl string) {
	//time.Sleep(time.Second*7)
	client := http.Client{Timeout: timeout}
	for  {
		time.Sleep(time.Second*7)
		req, err := http.NewRequest("POST", myUrl, strings.NewReader(myForm.Encode()))
		if err != nil {	goto end }
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		conn, err := client.Do(req)
		if err != nil {	goto end }
		var employee interface{}
		err = json.NewDecoder(bufio.NewReader(conn.Body)).Decode(&employee)
		if employee == nil { goto end }
	}
	end:
		_ = s.Shutdown(context.Background())
}