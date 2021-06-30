package upload_export_files

import (
	"path/filepath"
)

//parse according pathName to file run parseCards to save cards to database or parseSaveEmployeesAddSign to save employees to database
func parse(pathName string) error{
	path, name := filepath.Split(pathName)
	if path == cardsPath {
		return parseCards(pathName)
	}
	return parseSaveEmployeesAddSign(path, name)
}