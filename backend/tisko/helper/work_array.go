package helper

import (
	"fmt"
	"strconv"
	"strings"
)

const (
	allThingsRegex = "([0-9,]+|x)"
)

// ArrayUint64ToString convert from array to string for SQL
func ArrayUint64ToString(array []uint64, delim string) string {
	return strings.Trim(strings.ReplaceAll(fmt.Sprint(array), " ", delim), "[]")
}

// FromStringToArrayUint64 convert from string to array
func FromStringToArrayUint64(idsString string) []uint64 {
	fieldIdStrings :=  strings.Split(idsString, ",")
	result := make([]uint64,0,len(fieldIdStrings))
	for i := 0; i < len(fieldIdStrings); i++ {
		id, err := strconv.ParseUint(fieldIdStrings[i],10,64)
		if err !=nil {
			WriteErr(err)
			continue
		}
		result = append(result, id)
	}
	return result
}

// Filter help stuct to filter doc by location
type Filter struct {
	P map[string]string
}

// BuildQuery replace "Query1" and "Query2" from input by type, branches, cities, departments and division which are
//value for search document from database
func (f *Filter) BuildQuery(filterDoc string ) string {
	result := filterDoc
	result = strings.ReplaceAll(result, "Query1", f.buildQueryType())
	result = strings.ReplaceAll(result, "Query2", f.BuildQueryAssigned())
	return result
}

func (f *Filter) buildQueryType() string {
	type0 , ok := f.P["type"]
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

func (f *Filter) BuildQueryAssigned() string {
	if f.assignedEmpty() {
		return ""
	}
	return fmt.Sprint(" and assigned_to SIMILAR TO '%",
		"(",f.structure("branch"),"|x); ",
		"(",f.structure("city"),"|x); ",
		"(",f.structure("department"),"|x); ",
		"(",f.structure("division"),"|x)%'")
}

func (f *Filter) assignedEmpty() bool {
	return len(f.P)==0
}

func (f *Filter) structure(s string) string {
	s, ok := f.P[s]
	if ok {
		return ArrayInStringToRegularExpression(s)
	}
	return allThingsRegex
}

// ArrayInStringToRegularExpression from array in string("4,2,8,10,32") to DB alternative search "[0-9,]*4|2|8|10|32[0-9,]*"
// at empty and "x" string returning "([0-9,]+|x)" for all
func ArrayInStringToRegularExpression(arrayString string ) string {
	if arrayString=="x" || len(arrayString)==0{
		return allThingsRegex
	}
	array := strings.Split(arrayString, ",")
	if len(array)==1 {
		return fmt.Sprint("[0-9,]*", array[0],"[0-9,]*")
	}
	return fmt.Sprint("[0-9,]*(", strings.Join(array, "|"), ")[0-9,]*")
}