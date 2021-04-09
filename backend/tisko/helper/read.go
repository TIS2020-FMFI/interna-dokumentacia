package helper

import (
	"encoding/csv"
	"fmt"
	"golang.org/x/text/encoding/charmap"
	"io/ioutil"
	"os"
	"strings"
)

func ReturnTrimFile(nameFile string) string {
	defer func() {fmt.Println("load: ",nameFile )}()
	dat, err := ioutil.ReadFile(nameFile)
	Check(err)

	return strings.TrimSpace(string(dat))
}

func ReadCsvFile(filePath string) (fileArrayStrings [][]string,e error)  {
	f, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	csvReader := csv.NewReader(charmap.Windows1250.NewDecoder().Reader(f))
	csvReader.Comma = ';'
	records, err := csvReader.ReadAll()
	if err != nil {
		return nil,err
	}
	return records,  nil
}
