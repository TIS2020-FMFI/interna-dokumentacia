package main

import (
	"fmt"
	"time"
	comb "tisko/combination"
	conn "tisko/connection_database"
	"tisko/document"
	"tisko/employee"
	"tisko/signature"
)

func main() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println(r)
			time.Sleep(time.Second*5)
		}
	}()
	comb.AddHandle()
	employee.AddHandle()
	document.AddHandle()
	signature.AddHandle()
	conn.Start()
}
