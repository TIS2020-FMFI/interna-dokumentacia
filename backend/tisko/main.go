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
	"tisko/mail"
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
	conn.InitVars()
	comb.AddHandleInitVars()
	employee.AddHandleInitVars()
	document.AddHandleInitVars()
	signature.AddHandleInitVars()
	files.AddHandleInitVars()
	languages.AddHandleInitVars()
	training.AddHandleInitVars()
	mail.InitVars()
	//mail.RunMailSenders()
	conn.Start()
}

