package helper

// QueryThreeStrings tuples for three kind query
//- DocumentSignEmployee
//- OnlineSign
//- DocumentSign
type QueryThreeStrings struct {
	DocumentSignEmployee,
	OnlineSign,
	DocumentSign string
}

// MyStrings tuple of two names and SQL query
type MyStrings struct {
	First, Second, Query string
}

// StringsBool tuples for important data from document
type StringsBool struct {
	AssignedTo      string `gorm:"column:assigned_to"`
	Name            string `gorm:"column:name"`
	Link            string `gorm:"column:link"`
	RequireSuperior bool   `gorm:"column:require_superior"`
}

// NewEmployee tuples for important data of new employee
type NewEmployee struct {
	Id uint64`json:"id"`
	SuperiorId uint64`json:"superior_id"`
	Assigned string`json:"assigned_to"`
}

// Mail struct for extract mails from Database
//- Mail (map to "mail" in SQL)
type Mail struct{
	Mail string `gorm:"column:mail"`
}

