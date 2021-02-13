package fake_structs

type SignatureAndEmployee struct {
	Employee	Employee `gorm:"embedded" json:"employee"`
	Document	Document `gorm:"embedded" json:"document"`
	DocumentSignature	DocumentSignature `gorm:"embedded" json:"signature"`
}

type SignatureAndDocument struct {
	Document	Document `gorm:"embedded" json:"document"`
	DocumentSignature	DocumentSignature `gorm:"embedded" json:"signature"`
}

type OnlineTrainingAndSignature struct {
	OnlineTraining	OnlineTraining`gorm:"embedded" json:"training"`
	OnlineTrainingSignature	OnlineTrainingSignature`gorm:"embedded" json:"signature"`
}

type Signatures struct {
	DocumentSignature []SignatureAndDocument
	EmployeeSignature []SignatureAndEmployee
	OnlineSignature []OnlineTrainingAndSignature
}