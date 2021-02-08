package helper

import "os"

func MkdDirIfNotExist(dir string) {
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		_ = os.Mkdir(dir, 777)
	}
}

