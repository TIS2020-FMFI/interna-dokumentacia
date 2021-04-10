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
	myRouter.HandleFunc("/records-to-sign", anonimFunc)
	myRouter.HandleFunc("/signed-records", anonimFunc)
	myRouter.HandleFunc("/add-record", anonimFunc)
	myRouter.HandleFunc("/saved-record", anonimFunc)
	myRouter.HandleFunc("/finder", anonimFunc)
	myRouter.HandleFunc("/settings", anonimFunc)
	myRouter.HandleFunc("/logout", anonimFunc)
	staticDir := "/build_front_end/static/"
	myRouter.
		PathPrefix("/static/").
		Handler(http.StripPrefix("/static/",
			http.FileServer(http.Dir("."+staticDir))))
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
		h.WriteErr(e)
	}
}

func NewServer(port string) *http.Server {
	s := & http.Server{
		Addr: port,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	cloneRouter :=mux.NewRouter().StrictSlash(true)
	_ = myRouter.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		link, err := route.GetPathTemplate()
		methods, err2 := route.GetMethods()
		funcM := route.GetHandler()
		if err != nil || err2 != nil {
			return err
		}
		method := methods[0]
		cloneRouter.Methods(method).Path(link).Handler(funcM)
		return nil
	})
	s.Handler = cloneRouter
	return s
}

func tryIsAliveElseStop(s *http.Server, myUrl string) {
	client := http.Client{Timeout: timeout}
	for  {
		time.Sleep(time.Second*3)
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