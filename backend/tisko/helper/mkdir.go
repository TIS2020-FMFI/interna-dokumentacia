package helper

import (
	"fmt"
	"os"
)

func MkDirIfNotExist(dir string) {
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		_ = os.Mkdir(dir, 777)
	}
}


func MkTree2DirsIfNotExist(dir, dir2 string) {
	MkDirIfNotExist(dir)
	temp := fmt.Sprint(dir,"/", dir2)
	if _, err := os.Stat(temp); os.IsNotExist(err) {
		_ = os.Mkdir(temp, 777)
	}
}