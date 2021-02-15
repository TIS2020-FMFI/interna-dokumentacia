package document

import (
	"encoding/json"
	"gorm.io/gorm"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func createDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		tx := con.Db.Begin()
		defer tx.Rollback()
		id, ok := doCreate(writer, request, tx)
		if !ok {
			return
		}
		con.SendAccept(id, writer)
	}
}

func doCreate(writer http.ResponseWriter, request *http.Request, tx *gorm.DB) (uint64, bool) {
	var doc Document
	e := json.NewDecoder(request.Body).Decode(&doc)
	if e != nil {
		h.WriteErrWriteHaders(e, writer)
		return 0,false
	}
	e = controlIdIfExistSetPrewVersionUpdateOld(&doc, tx)
	if e != nil {
		h.WriteErrWriteHaders(e, writer)
		return 0,false
	}

	result := tx.Create(&doc)
	if result.Error != nil {
		h.WriteErrWriteHaders(result.Error, writer)
		return 0,false
	}
	tx.Commit()
	return doc.Id, true
}

func controlIdIfExistSetPrewVersionUpdateOld(d *Document,
	tx *gorm.DB) error{
	if d.Id==0 {
		return nil
	}
	re := tx.Model("documents").Where("id = ?",
		d.Id).Update("old", true)
	d.PrevVersionId=d.Id
	d.Id=0
	return re.Error
}