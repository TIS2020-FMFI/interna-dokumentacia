package helper_func




func Check(e error) {
	if e != nil {
		panic(e)
	}
}