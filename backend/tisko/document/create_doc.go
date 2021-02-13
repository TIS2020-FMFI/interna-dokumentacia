package document

import (
	"encoding/json"
	"gorm.io/gorm"
	"net/http"
	con "tisko/connection_database"
)

func createDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		id, ok := doCreate(writer, request, nil)
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
		http.Error(writer, e.Error(), http.StatusInternalServerError)
		return 0,false
	}
	tx = con.Db.Begin()
	defer tx.Rollback()
	e = controlIdIfExistSetPrewVersionUpdateOld(&doc, tx)
	if e != nil {
		http.Error(writer, e.Error(), http.StatusInternalServerError)
		return 0,false
	}

	result := tx.Create(&doc)
	if result.Error != nil {
		http.Error(writer, result.Error.Error(), http.StatusInternalServerError)
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