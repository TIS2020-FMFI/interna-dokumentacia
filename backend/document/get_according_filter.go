package document

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	con "tisko/connection_database"
	h "tisko/helper"
)

func getFilterDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		query, err := getQueryFilterDoc(request)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
		var docs []DocumentCompleteness
		con.Db.Raw(query).Find(&docs)
		if docs == nil {
			http.Error(writer, "", http.StatusInternalServerError)
			return
		}
		con.HeaderSendOk(writer)
		_ = json.NewEncoder(writer).Encode(docs)
	}
}

type filter struct {
	Types        []string `json:"type"`
	Branches     []uint64 `json:"branch"`
	Cities       []uint64 `json:"city"`
	Departments  []uint64 `json:"department"`
	Divisions    []uint64 `json:"division"`
	Records      []string `json:"record"`
	EmployeeName string   `json:"employeeName"`
	RecordName   string   `json:"recordName"`
}

func getQueryFilterDoc(request *http.Request) (string, error) {
	var doc filter
	e := json.NewDecoder(request.Body).Decode(&doc)
	if e != nil {
		return "", e
	}
	return doc.buildQuery(),nil
}

func (f *filter) buildQuery() string {
	result := filterDoc
	result = strings.ReplaceAll(result, "Query1", f.buildQueryType())
	result = strings.ReplaceAll(result, "", f.buildQueryAssigned())
	return result
}

func (f *filter) buildQueryType() string {
	if f.Types==nil || len(f.Types)==0 {
		return ""
	}
	return fmt.Sprint(" and type in ('",
		h.ArrayStringToString(f.Types, "','"),
		"') ")
}

func (f *filter) buildQueryAssigned() string {
	if f.assignedEmpty() {
		return ""
	}
	return fmt.Sprint(" and assigned_to SIMILAR TO '%",
		buildAlternatives(f.Branches),"; ",
		buildAlternatives(f.Cities),"; ",
		buildAlternatives(f.Departments),"; ",
		buildAlternatives(f.Divisions),"%'")
}

func buildAlternatives(slice []uint64) string {
	if h.Isempty(slice) {
		return "[0-9]+"
	}
	return fmt.Sprint("(", h.ArrayUint64ToString(slice," | "), ")")
}

func (f *filter) assignedEmpty() bool {
	return h.Isempty(f.Branches) &&
		h.Isempty(f.Cities) &&
		h.Isempty(f.Departments) &&
		h.Isempty(f.Divisions)
}
