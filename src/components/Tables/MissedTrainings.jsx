import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissedBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";
import {FormattedDeadline, FormattedTookPlace} from "../Others/DateFormatter";

const MissedTrainings = ({trainings}) => {

  console.log("trainings", trainings)

  const [modalInfo, setModalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleAccept = () => {
    // TODO MATO uloz trening ako podpisany
    // setTrns(trns.filter(t => t.id !== modalInfo.id)); // delete the document
    setShowModal(false);
  }

  const columns = [
    {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'date',
      text: 'Date',
      formatter: FormattedTookPlace,
    }, {
      dataField: 'deadline',
      text: 'Deadline',
      formatter: FormattedDeadline,
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

  return (
    <>
      <CaptionElement title="Trainings to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={trainings}
        columns={columns}
        noDataIndication={EmptyTable}
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

export default MissedTrainings;