package upload_export_files

import (
	"bufio"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	h "tisko/helper"
	"tisko/signature"
)

func export(writer http.ResponseWriter, request *http.Request) {
	name, err := exportSkillMatrixReturnName(request)
	if err != nil {
		http.Error(writer, "must give number > 0", http.StatusInternalServerError)
		return
	}
	fpath := "./"+exports+"/" + name
	if err := copyFile(writer, fpath); nil != err {
		http.Error(writer, "must give me file with key \"file\"", http.StatusInternalServerError)
		return
	}
}

func exportSkillMatrixReturnName(request *http.Request) (string,error) {
	map0 := mux.Vars(request)
	id, okId:= map0["id"]
	format, okFormat := map0["format"]
	if !okId || !okFormat {
		return "", fmt.Errorf("do not contains id or format, it must contains both")
	}
	e := saveJson(id)
	if e != nil {
		return "",e
	}
	name, err := runScript(id, format, "export.py")
	if err != nil {
		return "",err
	}
	h.MkDirIfNotExist(exports)
	return fmt.Sprint(name), nil
}

func saveJson(s string) error {
	id, err := strconv.ParseUint(s,10,64)
	if err != nil || id == 0 {
		return  err
	}
	modify := signature.FetchMatrix(id)

	file, err := os.Create(fmt.Sprint(imports,"/", dirJson, "/",id,".json"))
	if err != nil {
		return  err
	}
	b, err := json.Marshal(modify)
	if err != nil {
		file.Close()
		return  err
	}
	_, err = file.Write(b)
	if err != nil {
		file.Close()
		return  err
	}
	err = file.Close()
	return err
}

func runScript(first string, second string, script string) (string, error) {
	cmd := exec.Command("python",script )
	err3 := writePipe(cmd, first, second)
	if err3 != nil {
		return "", fmt.Errorf("%v",err3)
	}
	return returnResult(cmd)
}

func returnResult(cmd *exec.Cmd) (string, error) {
	stderr, err := cmd.StderrPipe()
	stdout, err2 := cmd.StdoutPipe()
 	if err!=nil || err2!=nil {
		return "", fmt.Errorf("%v, %v",err,err2)
	}
	readerOut := bufio.NewReader(stdout)
	readerErr := bufio.NewReader(stderr)
	chout := make(chan string)
	cherr := make(chan string)
	go waitRead(chout, readerOut)
	go waitRead(cherr, readerErr)
	if err := cmd.Start(); nil != err {
		return "", fmt.Errorf("%v",err)
	}
	select {
	case s:=<-chout:
		return s, nil
	case e:=<-cherr:
		return "", fmt.Errorf(e)
	}
}

func waitRead(ch chan string, buf *bufio.Reader) {
	scanner := bufio.NewScanner(buf)
	scanner.Scan()
	ch<-scanner.Text()
}

func writePipe(cmd *exec.Cmd,first string, second string) error{
	stdin, err := cmd.StdinPipe()
	if err!=nil {
		return fmt.Errorf("%v",err)
	}
	_,err = stdin.Write([]byte(fmt.Sprintln(first)))
	_,err2 := stdin.Write([]byte(fmt.Sprintln(second)))
	if err!=nil || err2!=nil {
		return fmt.Errorf("%v, %v",err,err2)
	}
	return nil
}

func copyFile(writer http.ResponseWriter, fpath string) (err error) {
	outfile, err := os.OpenFile(fpath, os.O_RDONLY, 0x0444)
	if nil != err {
		return
	}
	_, err = io.Copy(writer, outfile)
	return
}