package helper

import (
	"fmt"
	"io/ioutil"
"strings"
)

func ReturnTrimFile(nameFile string) string {
	defer func() {fmt.Println("load: ",nameFile )}()
	dat, err := ioutil.ReadFile(nameFile)
	Check(err)

	return strings.TrimSpace(string(dat))
}