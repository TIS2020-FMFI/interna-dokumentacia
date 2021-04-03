import React, { useState } from "react";
import EditBtn from "../components/Buttons/EditBtn";
import EditRecordModal from "../components/Modals/EditRecordModal";
import ReportBtn from "./report/ReportBtn";
import { buttonColumn, orderBy } from "../utils/functions";
import { FormattedRelease, Percentage } from "../utils/Formatter";
import MyBootstrapTable from "../components/Tables/MyBootstrapTable";

const FoundDocuments = ({ found, setFound }) => {
  const [formData, setFormData] = useState();
  console.log(found);

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "release_date.Time",
      text: "Release",
      formatter: FormattedRelease,
      sort: true,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
    },
    {
      dataField: "branches",
      text: "Branches",
      sort: true,
    },
    {
      dataField: "divisions",
      text: "Divisions",
      sort: true,
    },
    {
      dataField: "departments",
      text: "Departments",
      sort: true,
    },
    {
      dataField: "cities",
      text: "Cities",
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
    },
  ];

  return (
    <>
      <MyBootstrapTable
        title="Found documents"
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

export default FoundDocuments;
