package main

import (
	"fmt"
	"os"
	"time"
	comb "tisko/combination"
	conn "tisko/connection_database"
	"tisko/document"
	"tisko/employee"
	"tisko/helper"
	"tisko/mail"
	"tisko/signature"
	"tisko/tiker"
	"tisko/training"
	files "tisko/upload_export_files"
)

func main() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("error at: ", r)
			helper.WriteMassageAsError(r, "main")
			time.Sleep(time.Minute)
		}
	}()
	conn.InitVars()
	comb.AddHandleInitVars()
	employee.AddHandleInitVars()
	document.AddHandleInitVars()
	signature.AddHandleInitVars()
	files.AddHandleInitVars()
	training.AddHandleInitVars()
	mail.InitVars()
	mail.InitMailSenders()
	tiker.StartAll()
	conn.Start()
	getExe()
}

func getExe() {
	e, err := os.Executable()
	if err != nil {
		fmt.Println(err)
		return
	}
	p :=fmt.Sprintln(e)
	fmt.Println(p)
	helper.WriteMassageAsError(p, "main")
}

