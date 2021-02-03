package document

import (
	"gorm.io/gorm"
	comb "tisko/combination"
	h "tisko/helper"
)

var (
	addSignAfterConfirmDoc string
)
func AddSignature(combinations []*comb.Combination, DocData h.IntBool, tx *gorm.DB) {
	for i := 0; i < len(combinations); i++ {
		combination := combinations[i]
		tx.Exec(addSignAfterConfirmDoc,
			DocData.Bool0, DocData.Int0,
			combination.BranchId,
			combination.CityId,
			combination.DepartmentId,
			combination.DivisionId)

	}
}
