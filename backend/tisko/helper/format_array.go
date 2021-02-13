package helper

import (
	"fmt"
	"strings"
)

func ArrayUint64ToString(array []uint64, delim string) string {
	return strings.Trim(strings.ReplaceAll(fmt.Sprint(array), " ", delim), "[]")
}

func ArrayStringToString(array []string, delim string) string {
	return strings.Trim(strings.ReplaceAll(fmt.Sprint(array), " ", delim), "[]")
}
