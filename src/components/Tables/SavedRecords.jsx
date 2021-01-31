import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import EmptyTable from "./EmptyTable";
import {docs} from "../../data";
import SendBtn from "../Buttons/SendBtn";

const SavedRecords = ({setFormType, setFormData}) => {

  // TODO MATO get editable documents from DB
  const editable_docs = docs;

  const columns = [{
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
      headerStyle: () => { return {width: '1%'} }
    }, {
      dataField: 'sendBtn',
      text: 'Send',
      formatter: SendBtn,
      formatExtraData: {
        data: editable_docs
      },
      headerStyle: () => { return {width: '1%'} }
    }
  ];

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={editable_docs}
        columns={columns}
        noDataIndication={EmptyTable}
      />
    </>
  )
}

export default SavedRecords;

