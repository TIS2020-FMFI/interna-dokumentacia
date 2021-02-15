package helper

func Isempty(slice []string) bool {
	return slice==nil || len(slice)==0
}

func IsemptyUint64(slice []uint64) bool {
	return slice==nil || len(slice)==0
}