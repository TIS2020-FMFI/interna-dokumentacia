import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "../Others/CaptionElement";
import {SignedBtn} from "../Buttons/TableBtns";
import {nonExpandableDocs} from "../../functions";
import EmptyTable from "./EmptyTable";

const SignedDocuments = ({documents}) => {

  const columns = [{
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

  const expandColumns = [{
      dataField: 'anet_id',
      text: 'AnetID'
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'sign',
      text: 'Sign Day'
    }
  ];

  const expandRow = {
    nonExpandable: nonExpandableDocs(documents),
    renderer: (cell, row) => (
      <BootstrapTable
        keyField="id"
        hover
        data={documents[row].sub}
        bordered={ false }
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
        noDataIndication={EmptyTable}
      />
    </>
  );
}

export default SignedDocuments;
