package helper

func Check(e error) {
	if e != nil {
		panic(e)
	}
}

func Isempty(slice []string) bool {
	return slice==nil || len(slice)==0
}

func IsemptyUint64(slice []uint64) bool {
	return slice==nil || len(slice)==0
}

func DontPanicLogFile()  {
	if  r := recover(); r != nil{
		WriteErr(r)
	}
}