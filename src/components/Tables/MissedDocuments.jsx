import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissedBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";
import {nonExpandableDocs} from "../../functions";

const MissedDocuments = ({documents}) => {

  const [docs, setDocs] = useState(documents)
  const [modalInfo, setModalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleAccept = () => {
    // TODO MATO uloz dokument ako podpisany
    console.log(modalInfo);
    setDocs(docs.filter(d => d.id !== modalInfo.id)); // delete the document from the hook
    setShowModal(false);  // hide modal
  }

  const docs_columns = [{
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
      formatter: MissedBtn,
      formatExtraData: {
        setModalInfo: setModalInfo,
        setShowModal: setShowModal
      },
      headerStyle: () => { return {width: '1%'}; }
    }
  ];

  const expandDocsColumns = [{
      dataField: 'anet_id',
      text: 'AnetID'
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'signBtn',
      text: 'Sign',
      formatter: MissedBtn,
      formatExtraData: {
        setModalInfo: setModalInfo,
        setShowModal: setShowModal
      },
      headerStyle: () => { return {width: '1%'}; }
    }
  ];

  const expandRow = {
    nonExpandable: nonExpandableDocs(docs),
    renderer: (cell, row) => (
      <BootstrapTable
        keyField="id"
        hover
        data={docs[row].sub}
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
        noDataIndication={EmptyTable}
      />
      {showModal &&
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

export default MissedDocuments;