import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "../Secondary/CaptionElement";
import {Button} from "react-bootstrap";
import {documents} from "../../data";


const SignedRecords = () => {

  // Return true, if it's training document
  const hasSubs = (row) => { return Object.keys(row).includes('sub') }

  const MyButton = (cell, row) => {
    const handleClick = () => {
      console.log('Expand')
    }
    return !hasSubs(row) ? row.sign : (
      <Button onClick={handleClick}>Details </Button>
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
      dataField: 'sign',
      text: 'Sign Day',
      formatter: MyButton,
    }
  ];

  const expandColumns = [
    {
      dataField: 'anet_id',
      text: 'AnetID'
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'sign',
      text: 'Sign Day',
    }
  ];

  const expandRow = {
    nonExpandable: documents.map(doc => !hasSubs(doc) ? doc.id : null),  // docs that should not expand
    renderer: (cell, row) => (
      <BootstrapTable
        keyField="id"
        hover
        data={documents[row].sub}
        columns={expandColumns}/>
    )
  };

  return (
    <>
      <CaptionElement title="Signed Documents"/>
      <BootstrapTable
        classes="docs" // custom class
        keyField="id"
        hover
        data={documents}
        columns={columns}
        expandRow={expandRow}
      />
    </>
  );
}

export default SignedRecords;
