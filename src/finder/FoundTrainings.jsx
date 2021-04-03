import React, { useState } from "react";
import EditBtn from "../components/Buttons/EditBtn";
import EditRecordModal from "../components/Modals/EditRecordModal";
import ReportBtn from "./report/ReportBtn";
import { buttonColumn, orderBy } from "../utils/functions";
import { FormattedDate, Percentage } from "../utils/Formatter";
import MyBootstrapTable from "../components/Tables/MyBootstrapTable";

const FoundTrainings = ({ found, setFound, setReport }) => {
  const [formData, setFormData] = useState();

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "date.Time",
      text: "Release",
      formatter: FormattedDate,
      sort: true,
    },
    {
      dataField: "lector",
      text: "lector",
      sort: true,
    },
    {
      dataField: "agency",
      text: "agency",
      sort: true,
    },
    {
      dataField: "place",
      text: "place",
      sort: true,
    },
    {
      dataField: "complete",
      text: "State",
      formatter: Percentage,
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
      ...buttonColumn("ReportBtn"),
      formatter: ReportBtn,
      formatExtraData: {
        setReport: setReport,
      },
    },
  ];

  return (
    <>
      <MyBootstrapTable
        title="Found trainings"
        data={found}
        columns={columns}
        defaultSorted={orderBy("name")}
        // horizontal scroll
        wrapperClasses="table-responsive"
        rowClasses="text-nowrap"
      />
      {formData && (
        <EditRecordModal
          setRecords={setFound}
          formData={formData}
          setFormData={setFormData}
          actual={true}
        />
      )}
    </>
  );
};

export default FoundTrainings;
