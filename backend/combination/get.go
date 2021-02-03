package combination

import (
	"encoding/json"
	h "tisko/helper"
)

func GetCombinations(assignedTo h.StringBool)([]*Combination, error) {
	var combinations []*Combination
	err := json.Unmarshal([]byte(assignedTo.What), &combinations)
	return combinations, err
}
