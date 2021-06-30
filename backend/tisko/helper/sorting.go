package helper

import (
	"sort"
	"strings"
)
// alphabetic sorting type
type alphabetic []MyStrings

// Len implement for sort my type
func (list alphabetic) Len() int { return len(list) }

// Swap implement for sort my type
func (list alphabetic) Swap(i, j int) { list[i], list[j] = list[j], list[i] }

// Less implement for sort my type
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

// SortAlphabeticallyByFirst sorting first elements by alphabet
func SortAlphabeticallyByFirst(array []MyStrings)  {
	sort.Sort(alphabetic(array))
}
