package main

import (
	"fmt"
	"time"
	comb "tisko/combination"
	conn "tisko/connection_database"
	"tisko/document"
	"tisko/employee"
	"tisko/helper"
	"tisko/languages"
	"tisko/signature"
	"tisko/training"
	files "tisko/upload_export_files"
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
	languages.AddHandle()
	training.AddHandle()
	//mail.RunMailSenders()
	conn.Start()
}

