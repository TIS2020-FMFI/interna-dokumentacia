package helper

import "fmt"

func Isempty(slice []string) bool {
	return slice==nil || len(slice)==0
}

func IsemptyUint64(slice []uint64) bool {
	return slice==nil || len(slice)==0
}
func IfNotOkWriteErrWithMassage(ok bool, s string) {
	if !ok {
		WriteErr(fmt.Errorf(s))
	}
}