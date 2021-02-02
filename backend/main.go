package main

import (
	comb "tisko/combination"
	conn "tisko/connection_database"
	"tisko/document"
	"tisko/employee"
	"tisko/signature"
)

func main() {
	comb.AddHandle()
	employee.AddHandle()
	document.AddHandle()
	signature.AddHandle()
	conn.Start()
}
