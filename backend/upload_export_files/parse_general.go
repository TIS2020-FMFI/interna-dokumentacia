package upload_export_files

import (
	"path/filepath"
)

func parse(pathName string) error{
	dir, name := filepath.Split(pathName)
	if dir==cards {
		return parseCards(pathName)
	}else {
		return parseSaveEmployeesAddSign(dir, name)
	}
}