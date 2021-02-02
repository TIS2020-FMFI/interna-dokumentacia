package combination

import (
	"encoding/json"
)

func GetCombinations(assignedTo string)([]*Combination, error) {
	var combinations []*Combination
	err := json.Unmarshal([]byte(assignedTo), &combinations)
	return combinations, err
}
