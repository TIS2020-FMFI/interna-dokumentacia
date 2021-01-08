import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "../Others/CaptionElement";
import {SignedBtn, hasSubs} from "../Buttons/TableBtns";
import {documents} from "../../data";

const Signed = () => {

  // TODO JOZO refactor Signed.jsx as MissRecordsPage.jsx

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
      formatter: SignedBtn
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
        keyField="id"
        hover
        data={documents}
        columns={columns}
        expandRow={expandRow}
      />
    </>
  );
}

export default Signed;
