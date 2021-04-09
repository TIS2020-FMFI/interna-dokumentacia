package helper

import (
	"sort"
	"strings"
)

type alphabetic []MyStrings

func (list alphabetic) Len() int { return len(list) }

func (list alphabetic) Swap(i, j int) { list[i], list[j] = list[j], list[i] }

func (list alphabetic) Less(i, j int) bool {
	var si  = list[i].First
	var sj  = list[j].First
	var siLower = strings.ToLower(si)
	var sjLower = strings.ToLower(sj)
	if siLower == sjLower {
		return si < sj
	}
	return siLower < sjLower
}
func SortAlphabeticallyByFirst(array []MyStrings)  {
	sort.Sort(alphabetic(array))
}
