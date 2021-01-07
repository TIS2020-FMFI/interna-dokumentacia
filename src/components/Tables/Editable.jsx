import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import Empty from "./Empty";
import {documents} from "../../data";

const Editable = ({setFormType, setFormData}) => {

  const columns = [
    {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'release',
      text: 'Release'
    }, {
      dataField: 'deadline',
      text: 'Deadline'
    }, {
      dataField: 'editBtn',
      text: 'Edit',
      formatter: EditBtn,
      formatExtraData: {
        setFormType: setFormType,
        setFormData: setFormData
      }
    }
  ];

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={documents}
        columns={columns}
        noDataIndication={ Empty }
      />
    </>
  )
}

export default Editable;

