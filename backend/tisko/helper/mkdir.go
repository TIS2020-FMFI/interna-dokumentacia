package helper

import (
	"fmt"
	"os"
)

// MkDirIfNotExist create dir if not exist by name
func MkDirIfNotExist(dir string) {
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		_ = os.Mkdir(dir, 777)
	}
}


// MkTree2DirsIfNotExist create dir in dir if not exist by names
func MkTree2DirsIfNotExist(dir, dir2 string) {
	MkDirIfNotExist(dir)
	temp := fmt.Sprint(dir,"/", dir2)
	if _, err := os.Stat(temp); os.IsNotExist(err) {
		_ = os.Mkdir(temp, 777)
	}
}