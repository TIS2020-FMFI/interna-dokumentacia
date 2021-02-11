package helper

func Check(e error) {
	if e != nil {
		panic(e)
	}
}

func Isempty(slice []uint64) bool {
	return slice==nil || len(slice)==0
}