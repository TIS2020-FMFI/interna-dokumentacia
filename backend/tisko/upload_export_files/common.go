package upload_export_files

import (
	"encoding/json"
	"fmt"
	"os"
	con "tisko/connection_database"
	h "tisko/helper"
	paths "tisko/paths"
)

// csvConfig load and save config to import
type csvConfig struct {
	AnetId     uint  `json:"anet"`
	FirstName  uint `json:"first_name"`
	LastName   uint `json:"last_name"`
	Login      uint `json:"login"`
	Password   uint `json:"password"`
	Role       uint `json:"role"`
	Email      uint `json:"email"`
	JobTitle   uint `json:"job_title"`
	Manager    uint `json:"manager"`
	Branch     uint `json:"branch"`
	Division   uint `json:"division"`
	Department uint `json:"department"`
	City       uint `json:"city"`
	Import     uint `json:"import"`
	AnetIdCard uint `json:"anet_card"`
	NumberCard uint `json:"number_card"`
}

const (
	imports       = "imports"
	card          = "employee_card"
	divisions     = "divisions"
	dirJson       = "json"
	employeesPath = paths.GlobalDir  + imports + "/" + divisions + "/"
	cardsPath     = paths.GlobalDir + imports + "/" + card + "/"
	dir           = paths.GlobalDir +"upload_export_files/"
)

var (
	config                                                           *csvConfig
	insertSelectIdByName, employeesSelectByImport, employeesIdAnetId string
)

// AddHandleInitVars registr handler, init variables and dictionaries, WARNING: it can stop program with panic
func AddHandleInitVars() {
	init0()
	con.AddHeaderPost(paths.Upload, upload)
	con.AddHeaderGetID(fmt.Sprint(paths.Export, "/{format}"), exportFile)
}

// init0 init variables and dictionaries, WARNING: it can stop program with panic
func init0() {
	initQuery()
	h.MkTree2DirsIfNotExist(imports, card)
	h.MkTree2DirsIfNotExist(imports, divisions)
	h.MkTree2DirsIfNotExist(imports, dirJson)
	initConfigIfNotExistOrLoad()
}

// initQuery init query scripts, WARNING: it can stop program with panic
func initQuery() {
	insertSelectIdByName = h.ReturnTrimFile(dir + "insert_select_id_by_name.txt")
	employeesSelectByImport = h.ReturnTrimFile(dir + "all_employees_from_imports.txt")
	employeesIdAnetId = h.ReturnTrimFile(dir + "employees_id_anet_id.txt")
}

// initConfigIfNotExistOrLoad if do not exist file with csvConfig, if exist load, WARNING: it can stop program with panic
func initConfigIfNotExistOrLoad() {
	config = newDefaultConfig()
	configFile := dir + "csv_config.txt"
	f, err := os.Open(configFile)
	defer h.MyCloseFileIfExist(f)
	if err != nil {
		f, err = os.Create(configFile)
		if err != nil {
			panic(err)
		}
		err = json.NewEncoder(f).Encode(&config)
		if err != nil {
			panic(err)
		}
	} else {
		err = json.NewDecoder(f).Decode(&config)
		if err != nil {
			panic(err)
		}
	}
}

// newDefaultConfig return configuration, which was known at coding process
func newDefaultConfig() *csvConfig {
	return &csvConfig{
		AnetId:     4,
		FirstName:  6,
		LastName:   5,
		Login:      1,
		Password:   2,
		Role:       13,
		Email:      8,
		JobTitle:   10,
		Manager:    18,
		Branch:     11,
		Division:   12,
		Department: 13,
		City:       14,
		Import:     0,
		AnetIdCard: 3,
		NumberCard: 2,
	}
}