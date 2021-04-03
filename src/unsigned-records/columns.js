import {
  FormattedDate,
  FormattedDeadline,
  FormattedEmployeeDate,
  FormattedRelease,
  FullName,
  NameWithLink,
} from "../utils/Formatter";
import { MissedBtn } from "../components/Buttons/TableBtns";
import { buttonColumn } from "../utils/functions";

export const trainingsToSignColumns = (setModalInfo, setShowModal) => [
  {
    dataField: "name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "date.Time",
    text: "Date",
    sort: true,
    formatter: FormattedDate,
  },
  {
    dataField: "deadline.Time",
    text: "Deadline",
    sort: true,
    formatter: FormattedDeadline,
  },
  {
    ...buttonColumn(),
    formatter: MissedBtn,
    formatExtraData: {
      setModalInfo: setModalInfo,
      setShowModal: setShowModal,
    },
  },
];

export const documentsToSignColumns = (setModalInfo, setShowModal) => [
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
    dataField: "deadline.Time",
    text: "Deadline",
    sort: true,
    formatter: FormattedDeadline,
  },
  {
    ...buttonColumn(),
    formatter: MissedBtn,
    formatExtraData: {
      setModalInfo: setModalInfo,
      setShowModal: setShowModal,
      asSuperior: false,
    },
  },
];

export const documentsToSignExpandColumns = (setModalInfo, setShowModal) => [
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
    text: "Sign Date",
    sort: true,
    formatter: FormattedEmployeeDate,
  },
  {
    ...buttonColumn(),
    formatter: MissedBtn,
    formatExtraData: {
      setModalInfo: setModalInfo,
      setShowModal: setShowModal,
      asSuperior: true,
    },
  },
];
