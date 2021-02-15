package helper

type QueryThreeStrings struct {
	DocumentSignEmployee,
	OnlineSign,
	DocumentSign string
}

type MyStrings struct {
	First, Second, Query string
}

type StringsBool struct {
	AssignedTo      string `gorm:"column:assigned_to"`
	Name            string `gorm:"column:name"`
	Link            string `gorm:"column:link"`
	RequireSuperior bool   `gorm:"column:require_superior"`
}

type NewEmployee struct {
	Id uint64`json:"id"`
	SuperiorId uint64`json:"superior_id"`
	Assigned string`json:"assigned_to"`
}

type Mail struct{
	Mail string `gorm:"column:mail"`
}
