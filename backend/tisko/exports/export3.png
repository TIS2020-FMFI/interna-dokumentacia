package main

import (
	"fmt"
	"time"
	comb "tisko/combination"
	conn "tisko/connection_database"
	"tisko/document"
	"tisko/employee"
	"tisko/helper"
	"tisko/mail"
	files"tisko/upload_export_files"
	"tisko/signature"
)

func main() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println(r)
			helper.WriteErr(r)
			time.Sleep(time.Second*5)
		}
	}()
	comb.AddHandle()
	employee.AddHandle()
	document.AddHandle()
	signature.AddHandle()
	files.AddHandle()
	mail.RunMailSenders()
	conn.Start()
}

