package helper_func

import (
	"io/ioutil"
	"strings"
)

func ReturnTrimFile(nameFile string) string {
	dat, err := ioutil.ReadFile(nameFile)
	Check(err)
	return strings.TrimSpace(string(dat))
}
