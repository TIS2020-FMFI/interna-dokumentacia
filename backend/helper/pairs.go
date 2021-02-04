package helper

import "net/http"

type StringBool struct {
	What    string
	Whether bool
}


type IntBool struct {
	Int0 uint
	Bool0 bool
}

type RquestWriter struct {
	W http.ResponseWriter
	R *http.Request
}

type MyStrings struct {
	First, Second string
}

type DataWR struct {
	S *MyStrings
	RW *RquestWriter
}