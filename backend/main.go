package main

import (
	conn "tisko/connection_database"
	"tisko/document"
	"tisko/employee"
	"tisko/signature"
)

func main() {
	employee.AddHandle()
	document.AddHandle()
	signature.AddHandle()
	conn.Start()
}
