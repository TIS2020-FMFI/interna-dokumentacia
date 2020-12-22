import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import CaptionElement from "../Secondary/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import {documents} from "../../data"
import {Button} from "react-bootstrap";

const MissingDocs = () => {

  // Return true, if it's training document
  const hasSubs = (row) => { return Object.keys(row).includes('sub') }

  const SMButton = (cell, row) => {
    const handleClick = (row) => {
      // if it's 'sing' btn => open Model
      if (!hasSubs(row)) {
        setModalInfo(row);
        setShowModal(true);
      }
    }
    return (
      <Button onClick={() => handleClick(row)}>
        {hasSubs(row) ? 'Details' : 'Sign'}
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
      dataField: 'signBtn',
      text: 'Sign',
      formatter: SMButton,
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
      dataField: 'signBtn',
      text: 'Sign',
      formatter: SMButton,
    }
  ];

  // State management
  const [data, setData] = useState(documents)
  const [modalInfo, setModalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleAccept = () => {
    console.log(`Accepted by ${modalInfo}`);
    setData(data.filter(p => p.id !== modalInfo.id)); // delete the document
    setShowModal(false)
  }

  const expandRow = {
    nonExpandable: documents.map(doc => !hasSubs(doc) ? doc.id : null),  // docs that should not expand
    renderer: (cell, row) => (
      <BootstrapTable
        keyField="id"
        hover
        data={documents[row].sub} todo
        columns={expandColumns}/>
    )
  };

  const EmptyTable = () => {
    return (<p>Table is empty</p>)
  }

  return (
    <>
      <CaptionElement title="Documents to sign"/>
      <BootstrapTable
        classes="docs"  // my css class
        keyField="id"
        hover
        data={data}
        columns={columns}
        expandRow={expandRow}
        noDataIndication={ EmptyTable }
      />
      { ! showModal ? null :
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalInfo={modalInfo}
          handleAccept={handleAccept}
        />
      }
    </>
  )
}

export default MissingDocs;

