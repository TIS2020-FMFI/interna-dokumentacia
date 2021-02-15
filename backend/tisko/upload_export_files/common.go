package upload_export_files

import (
	"fmt"
	con "tisko/connection_database"
	h "tisko/helper"
	path "tisko/paths"
)

const (
	imports = "imports"
	exports = "exports"
	card = "employee_card"
	divisions = "divisions"
	dirJson = "json"
)

func AddHandleInitVars() {
	init0()
	con.AddHeaderPost(path.Upload, upload)
	con.AddHeaderGetID(fmt.Sprint(path.Export, "/{format}"), export)
}
func init0() {
	h.MkTree2DirsIfNotExist(imports, card)
	h.MkTree2DirsIfNotExist(imports, divisions)
	h.MkTree2DirsIfNotExist(imports, dirJson)
}