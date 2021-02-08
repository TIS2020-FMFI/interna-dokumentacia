package upload_export_files

import (
	"bufio"
	"fmt"
	"github.com/gorilla/mux"
	"io"
	"net/http"
	"os"
	"os/exec"
	h "tisko/helper"
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
	name, err := runScript(map0["id"], map0["format"])
	if err != nil {
		return "",err
	}
	h.MkdDirIfNotExist(exports)
	return fmt.Sprint(name), nil
}

func runScript(id string, format string) (string, error) {
	cmd := exec.Command("python", "export.py")
	err3 := writePipe(cmd, id, format)
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

func writePipe(cmd *exec.Cmd, id string, format string) error{
	stdin, err := cmd.StdinPipe()
	if err!=nil {
		return fmt.Errorf("%v",err)
	}
	_,err = stdin.Write([]byte(fmt.Sprintln(id)))
	_,err2 := stdin.Write([]byte(fmt.Sprintln(format)))
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