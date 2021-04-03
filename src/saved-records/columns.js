import {
  FormattedDate,
  FormattedDeadline,
  FormattedRelease,
} from "../utils/Formatter";
import EditBtn from "../components/Buttons/EditBtn";
import SendBtn from "../components/Buttons/SendBtn";
import { buttonColumn } from "../utils/functions";

export const savedDocumentsColumns = (
  setFormData,
  setSavedRec,
  setNotification
) => [
  {
    dataField: "name",
    text: "Name",
    sort: true,
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
    ...buttonColumn("EditBtn"),
    formatter: EditBtn,
    formatExtraData: {
      setFormData: setFormData,
    },
  },
  {
    ...buttonColumn("SendBtn"),
    formatter: SendBtn,
    formatExtraData: {
      setNotification: setNotification,
      setSavedRec: setSavedRec,
    },
  },
];

export const savedTrainingsColumns = (
  setFormData,
  setSavedRec,
  setNotification
) => [
  {
    dataField: "name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "date.Time",
    text: "Release",
    sort: true,
    formatter: FormattedDate,
  },
  {
    dataField: "place",
    text: "Place",
    sort: true,
  },
  {
    ...buttonColumn("EditBtn"),
    formatter: EditBtn,
    formatExtraData: {
      setFormData: setFormData,
    },
  },
  {
    ...buttonColumn("SendBtn"),
    formatter: SendBtn,
    formatExtraData: {
      setNotification: setNotification,
      setSavedRec: setSavedRec,
    },
  },
];
