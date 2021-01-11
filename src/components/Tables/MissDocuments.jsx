import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissingBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";

const MissDocuments = ({documents}) => {

  const [docs, setDocs] = useState(documents)
  const [modalInfo, setModalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleAccept = () => {
    setDocs(docs.filter(d => d.id !== modalInfo.id)); // delete the document
    setShowModal(false);
  }

  const docs_columns = [
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
      formatter: MissingBtn,
      formatExtraData: {
        setModalInfo: setModalInfo,
        setShowModal: setShowModal
      },
      headerStyle: () => { return {width: '1%'}; }
    }
  ];

  const expandDocsColumns = [
    {
      dataField: 'anet_id',
      text: 'AnetID'
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'signBtn',
      text: 'Sign',
      formatter: MissingBtn,
      formatExtraData: {
        setModalInfo: setModalInfo,
        setShowModal: setShowModal
      },
      headerStyle: () => { return {width: '1%'}; }
    }
  ];

  const expandRow = {
    nonExpandable: docs.map(doc => Object.keys(doc).includes('sub') ? null : doc.id),  // docs that should not expand
    renderer: (cell, row) => (
      <BootstrapTable
        keyField="id"
        hover
        data={docs[row].sub} todo
        columns={expandDocsColumns}/>
    )
  };

  return (
    <>
      <CaptionElement title="Documents to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={docs}
        columns={docs_columns}
        expandRow={expandRow}
        noDataIndication={ EmptyTable }
      />
      { showModal &&
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

export default MissDocuments;