package document

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	con "tisko/connection_database"
	h "tisko/helper"
)

const (
	allThingsRegex = "([0-9]+|x)"
)

func getFilterDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		query, err := getQueryFilterDoc(request)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		getCompletnessByQuery(query, writer)
	}
}

type Filter struct {
	p map[string]string
}

func getQueryFilterDoc(request *http.Request) (string, error) {
	var (
		doc Filter
		myMap map[string]string
	)
	e := json.NewDecoder(request.Body).Decode(&myMap)
	if e != nil {
		return "",e
	}
	doc.p=myMap
	return doc.buildQuery(),nil
}

func (f *Filter) buildQuery() string {
	result := filterDoc
	result = strings.ReplaceAll(result, "Query1", f.buildQueryType())
	result = strings.ReplaceAll(result, "Query2", f.buildQueryAssigned())
	return result
}

func (f *Filter) buildQueryType() string {
	type0 , ok := f.p["type"]
	if !ok {
		return ""
	}
	if len(type0)==0 {
		return ""
	}
	t := strings.Split(type0,",")
	if len(t)==1 {
		return fmt.Sprint(" and type=", t[0], " ")
	}
	return fmt.Sprint(" and type in ('",strings.Join(t,"|"),
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
		return h.ArrayInStringToRegularExpression(s, allThingsRegex)
	}
	return allThingsRegex
}

func (f *Filter) cities() string {
	s, ok := f.p["city"]
	if ok {
		return h.ArrayInStringToRegularExpression(s, allThingsRegex)
	}
	return allThingsRegex
}

func (f *Filter) departments() string {
	s, ok := f.p["department"]
	if ok {
		return h.ArrayInStringToRegularExpression(s, allThingsRegex)
	}
	return allThingsRegex
}

func (f *Filter) divisions()string{
	s, ok := f.p["division"]
	if ok {
		return h.ArrayInStringToRegularExpression(s, allThingsRegex)
	}
	return allThingsRegex
}