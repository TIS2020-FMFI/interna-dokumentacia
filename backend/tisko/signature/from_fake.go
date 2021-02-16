package signature

import (
	"tisko/document"
	"tisko/employee"
	"tisko/signature/fake_structs"
	"tisko/training"
)

func convertToNormalSignDoc(signature fake_structs.DocumentSignature) DocumentSignature {
	return DocumentSignature{
		Id:         signature.Id,
		EndDate:    signature.EndDate,
		StartDate:  signature.StartDate,
		EmployeeId: signature.EmployeeId,
		SuperiorId: signature.SuperiorId,
		DocumentId: signature.DocumentId,
		Cancel:     signature.Cancel,
	}
}

func convertToNormalDoc(d fake_structs.Document) document.Document {
	return document.Document{
		Id:              d.Id,
		Name:            d.Name,
		Link:            d.Link,
		Note:            d.Note,
		ReleaseDate:     d.ReleaseDate,
		Deadline:        d.Deadline,
		OrderNumber:     d.OrderNumber,
		Version:         d.Version,
		PrevVersionId:   d.PrevVersionId,
		Assigned:        d.Assigned,
		RequireSuperior: d.RequireSuperior,
		Edited:          d.Edited,
	}
}

func convertToNormalEmployee(e fake_structs.Employee) employee.Employee {
	return employee.Employee{
		BasicEmployee:employee.BasicEmployee{
			Id:        e.Id,
			FirstName: e.FirstName,
			LastName:  e.LastName,
		},
		Login:        e.Login,
		Password:     e.Password,
		Role:         e.Role,
		Email:        e.Email,
		JobTitle:     e.JobTitle,
		ManagerId:    e.ManagerId,
		BranchId:     e.BranchId,
		DivisionId:   e.DivisionId,
		DepartmentId: e.DepartmentId,
		CityId:       e.CityId,
		Deleted:      e.Deleted,
		ImportId:     e.ImportId,
	}
}

func convertToNormalSingOnlineTraining(signature fake_structs.OnlineTrainingSignature) OnlineTrainingSignature {
	return OnlineTrainingSignature{
		Id:         signature.Id,
		EmployeeId: signature.EmployeeId,
		TrainingId: signature.TrainingId,
		Date:       signature.Date,
	}
}

func convertToNormalTraining(onlineTraining fake_structs.OnlineTraining) training.OnlineTraining {
	return training.OnlineTraining{
		Id:       onlineTraining.Id,
		Name:     onlineTraining.Name,
		Lector:   onlineTraining.Lector,
		Agency:   onlineTraining.Agency,
		Place:    onlineTraining.Place,
		Date:     onlineTraining.Date,
		Duration: onlineTraining.Duration,
		Agenda:   onlineTraining.Agenda,
		Deadline: onlineTraining.Deadline,
	}
}
