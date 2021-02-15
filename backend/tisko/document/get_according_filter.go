package document

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strings"
	con "tisko/connection_database"
	h "tisko/helper"
)

func getFilterDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		query, err := getQueryFilterDoc(request)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		var docs []DocumentCompleteness
		re := con.Db.Raw(query).Find(&docs)
		if re.Error!= nil {
			h.WriteErrWriteHaders(re.Error, writer)
			return
		}
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(docs)
	}
}

type Filter struct {
	p map[string]string
}

func getQueryFilterDoc(request *http.Request) (string, error) {
	var doc Filter
	m := mux.Vars(request)
	doc.p=m
	return doc.buildQuery(),nil
}

func (f *Filter) buildQuery() string {
	result := filterDoc
	result = strings.ReplaceAll(result, "Query1", f.buildQueryType())
	result = strings.ReplaceAll(result, "Query2", f.buildQueryAssigned())
	return result
}

func (f *Filter) buildQueryType() string {
	t , ok := f.p["type"]
	if !ok {
		return ""
	}
	if len(t)==0 {
		return ""
	}
	return fmt.Sprint(" and type in ('",t,
		"') ")
}

func (f *Filter) buildQueryAssigned() string {
	if f.assignedEmpty() {
		return ""
	}
	return fmt.Sprint(" and assigned_to SIMILAR TO '%",
		f.branches(),"; ",
		f.cities(),"; ",
		f.departments(),"; ",
		f.divisions(),"%'")
}

func (f *Filter) assignedEmpty() bool {
	return len(f.p)==0
}

func (f *Filter) branches() string {
	s, ok := f.p["branch"]
	if ok {
		return s
	}
	return "[0-9]+"
}

func (f *Filter) cities() string {
	s, ok := f.p["city"]
	if ok {
		return s
	}
	return "[0-9]+"
}

func (f *Filter) departments() string {
	s, ok := f.p["department"]
	if ok {
		return s
	}
	return "[0-9]+"
}

func (f *Filter) divisions()string{
	s, ok := f.p["division"]
	if ok {
		return s
	}
	return "[0-9]+"
}