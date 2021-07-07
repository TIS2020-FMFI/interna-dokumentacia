package helper

import (
	"encoding/csv"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
)

// ReturnTrimFile read whole file and return trim string, WARNING: if apear error, this func will stop program with panic
func ReturnTrimFile(nameFile string) string {
	defer func() {fmt.Println("load: ",nameFile )}()
	dat, err := ioutil.ReadFile(nameFile)
	Check(err)

	return strings.TrimSpace(string(dat))
}

// ReadCsvFile read csv return error or data as [][]string
func ReadCsvFile(filePath string) (fileArrayStrings [][]string,e error)  {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	csvReader := csv.NewReader(file)
	csvReader.Comma = ';'
	fileArrayStrings, err = csvReader.ReadAll()
	if err == nil {
		trimAll(fileArrayStrings)
	}
	return
}

func trimAll(fileArrayStrings [][]string) {
	if fileArrayStrings==nil            ||
		len(fileArrayStrings) == 0 {
		return
	}
	removeBOM(fileArrayStrings)
	for i := 0; i < len(fileArrayStrings); i++ {
		for j := 0; j < len(fileArrayStrings[i]); j++ {
			fileArrayStrings[i][j] = strings.TrimSpace(fileArrayStrings[i][j])
		}
	}
}



func removeBOM(fileArrayStrings [][]string) {
	if len(fileArrayStrings[0]) == 0   ||
		len(fileArrayStrings[0][0]) == 0{
		return
	}
	bom := []byte{0xef, 0xbb, 0xbf} // UTF-8
	fileArrayStrings[0][0] = strings.ReplaceAll(fileArrayStrings[0][0], string(bom), "")
}
