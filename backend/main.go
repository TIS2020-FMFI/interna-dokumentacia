package main

import (
	conn "tisko/connection_database"
	"tisko/document"
	"tisko/employee"
)

func main() {
	employee.AddHandle()
	document.AddHandle()
	conn.Start()
}
