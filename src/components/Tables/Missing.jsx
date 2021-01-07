import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import {MissingBtn} from "../Buttons/TableBtns";
import Empty from "./Empty";
import {documents} from "../../data"

const Missing = () => {

  // State management
  const [data, setData] = useState(documents)
  const [modalInfo, setModalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleAccept = () => {
    console.log(`Accepted by ${modalInfo}`);
    setData(data.filter(p => p.id !== modalInfo.id)); // delete the document
    setShowModal(false);
  }

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
      formatter: MissingBtn,
      formatExtraData: {
        setFormType: setModalInfo,
        setFormData: setShowModal
      }
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
      formatter: MissingBtn,
      formatExtraData: {
        setFormType: setModalInfo,
        setFormData: setShowModal
      }
    }
  ];
  const expandRow = {
    nonExpandable: documents.map(doc => Object.keys(doc).includes('sub') ? null : doc.id),  // docs that should not expand
    renderer: (cell, row) => (
      <BootstrapTable
        keyField="id"
        hover
        data={documents[row].sub} todo
        columns={expandColumns}/>
    )
  };

  return (
    <>
      <CaptionElement title="Documents to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={data}
        columns={columns}
        expandRow={expandRow}
        noDataIndication={ Empty }
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

export default Missing;

