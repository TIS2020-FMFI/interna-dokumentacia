package helper

import (
	"fmt"
	"strconv"
	"strings"
)

func ArrayUint64ToString(array []uint64, delim string) string {
	return strings.Trim(strings.ReplaceAll(fmt.Sprint(array), " ", delim), "[]")
}

func ArrayStringToString(array []string, delim string) string {
	return strings.Trim(strings.ReplaceAll(fmt.Sprint(array), " ", delim), "[]")
}


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
func ArrayInStringToRegularExpression(arrayString, allThingsInsteadX string ) string {
	if arrayString=="x" || len(arrayString)==0{
		return allThingsInsteadX
	}
	array := strings.Split(arrayString, ",")
	if len(array)==1 {
		return array[0]
	}
	return fmt.Sprint("(", strings.Join(array, "|"), ")")
}