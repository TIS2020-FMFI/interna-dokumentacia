import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import Empty from "./Empty";
import {documents} from "../../data";

const Editable = ({setFormType, setFormData}) => {

  // TODO MATO get editable documents from DB
  const editable_docs = documents;

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
      },
      headerStyle: () => {
        return { width: '41.47px' };
      }
    }
  ];

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={editable_docs}
        columns={columns}
        noDataIndication={ Empty }
      />
    </>
  )
}

export default Editable;

