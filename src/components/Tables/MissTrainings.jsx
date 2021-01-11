import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissingBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";

const MissTrainings = ({trainings}) => {

  const [trns, setTrns] = useState(trainings)
  const [modalInfo, setModalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleAccept = () => {
    setTrns(trns.filter(t => t.id !== modalInfo.id)); // delete the document
    setShowModal(false);
  }

  const trns_columns = [
    {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'took_place',
      text: 'Took place'
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

  // const trns_columns = docs_columns.map(o => {
  //   if (o.dataField === 'release') {
  //     o.dataField = 'took_place';
  //     o.text = 'Took place';
  //   } return o;
  // });

  return (
    <>
      <CaptionElement title="Trainings to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={trns}
        columns={trns_columns}
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

export default MissTrainings;