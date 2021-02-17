package connection_database

import (
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strings"
	h "tisko/helper"
)
func homePage(writer http.ResponseWriter, request *http.Request) {
	if SetHeadersReturnIsContunue(writer, request) {
		nav := buildNav(request)
		writer.Header().Set("Content-Type", "text/html; charset=UTF-8")
		writer.WriteHeader(http.StatusOK)
		_, _ = writer.Write([]byte(fmt.Sprint(startPart, nav, endPart)))
	}
}

func buildNav(request *http.Request) string {
	var result strings.Builder
	for i := 0; i < len(homePageStringsMethod); i++ {
		method := homePageStringsMethod[i].Second
		wholeUrl:= fmt.Sprint(strings.TrimSpace(request.Host), homePageStringsMethod[i].First)
		result.WriteString(fmt.Sprintln(
			"<a class=\"active\" href=\"",
			wholeUrl,
			"\" style=\"display: block;\">",
			"link: ",wholeUrl,
			" method:",method,
			"</a>"))
	}

	return result.String()
}

func inithomePageString() {
	_ = myRouter.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		link, err := route.GetPathTemplate()
		method, err2:= route.GetMethods()
		if err != nil || err2!=nil {
			return err
		}
		homePageStringsMethod = append(homePageStringsMethod, h.MyStrings{
			First:  link,
			Second: method[0],
		})
		return nil
	})
}