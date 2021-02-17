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
		id, err := doCreate( request, tx)
		if err!= nil {
			h.WriteErrWriteHaders(err,writer)
			return
		}
		tx.Commit()
		con.SendAccept(id, writer)
	}
}

func doCreate( request *http.Request, tx *gorm.DB) (uint64, error) {
	var doc Document
	e := json.NewDecoder(request.Body).Decode(&doc)
	if e != nil {
		return 0,e
	}
	e = controlIdIfExistSetPrewVersionUpdateOld(&doc, tx)
	if e != nil {
		return 0,e
	}
	result := tx.Omit("edited").Create(&doc)
	if result.Error != nil {
		return 0,result.Error
	}
	return doc.Id, nil
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