package document

import (
	"encoding/json"
	"gorm.io/gorm"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

//createDoc handle for create create new document
func createDoc(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContinue(writer, request) {
		tx := con.Db.Begin()
		defer tx.Rollback()
		id, err := doCreate( request, tx)
		if err!= nil {
			h.WriteErrWriteHandlers(err, "createDoc",writer)
			return
		}
		tx.Commit()
		con.SendAccept(id, writer)
	}
}

//doCreate fetch document from request *http.Request and write to db by transaction tx *gorm.DB with edited = true
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
	doc.Edited=true
	result := tx.Create(&doc)
	if result.Error != nil {
		return 0,result.Error
	}
	return doc.Id, nil
}

//controlIdIfExistSetPrewVersionUpdateOld set  Document "old" = true by id then set predVersionId = id and then id = 0
func controlIdIfExistSetPrewVersionUpdateOld(d *Document,tx *gorm.DB) error{
	if d.Id==0 {
		return nil
	}
	re := tx.Model(&Document{Id: d.Id}).Updates(map[string]interface{}{"old": true})
	d.PrevVersionId=d.Id
	d.Id=0
	return re.Error
}