package helper

import (
	"os"
)

// MyCloseFileIfExist close open file
func MyCloseFileIfExist(f *os.File) {
	if f != nil {
		f.Close()
	}
}