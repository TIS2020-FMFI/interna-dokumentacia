package upload_export_files

import (
	"fmt"
	con "tisko/connection_database"
	path "tisko/paths"
)

const (
	imports = "imports"
	exports = "exports"
)

func AddHandle() {
	con.AddHeaderPost(path.Upload, upload)
	con.AddHeaderGetID(fmt.Sprint(path.Export, "/{format}"), export)
}