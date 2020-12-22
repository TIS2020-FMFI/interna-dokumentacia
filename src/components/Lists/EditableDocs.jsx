import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import {Button} from "react-bootstrap";
import {documents} from "../../data";

const EditableDocs = ({setFormType, setFormData}) => {

  const EditBtn = (cell, row) => {
    const handleClick = () => {
      // console.log(row);
      // todo infinite loop error
      setFormData(row);
      setFormType("new_doc");
    }
    return (
      <Button onClick={handleClick}>
        Edit
      </Button>
    );
  };

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
    }
  ];

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={documents}
        columns={columns}
      />
    </>
  )
}

export default EditableDocs;

