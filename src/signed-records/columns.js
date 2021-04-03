import {
  FormattedDate,
  FormattedEmployeeDate,
  FormattedRelease,
  FormattedSuperiorDate,
  FormattedTrainingDate,
  FullName,
  NameWithLink,
} from "../utils/Formatter";
import { SignedBtn } from "../components/Buttons/TableBtns";

export const signedDocumentsColumns = () => [
  {
    dataField: "name",
    text: "Name",
    sort: true,
    formatter: NameWithLink,
  },
  {
    dataField: "release_date.Time",
    text: "Release",
    sort: true,
    formatter: FormattedRelease,
  },
  {
    dataField: "signatures[0].e_date.Time",
    text: "Signed date",
    sort: true,
    formatter: SignedBtn,
  },
];

export const signedDocumentsExpandColumns = () => [
  {
    dataField: "employee.id",
    text: "Employee ID",
    sort: true,
  },
  {
    dataField: "employee.last_name",
    text: "Full name",
    sort: true,
    formatter: FullName,
  },
  {
    dataField: "e_date.Time",
    text: "Employee Sign",
    sort: true,
    formatter: FormattedEmployeeDate,
  },
  {
    dataField: "s_date.Time",
    text: "My Sign",
    sort: true,
    formatter: FormattedSuperiorDate,
  },
];

export const signedTrainingsExpandColumns = () => [
  {
    dataField: "name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "date.Time",
    text: "Took place",
    sort: true,
    formatter: FormattedDate,
  },
  {
    dataField: "signatures[0].date.Time", // always array with length of 1 [by SQL query]
    text: "Signed date",
    sort: true,
    formatter: FormattedTrainingDate,
  },
];
