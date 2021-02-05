import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissedBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";
import {nonExpandableDocs, require_superior} from "../../functions";
import {FormattedDeadline, FormattedRelease} from "../Others/DateFormatter";
import {proxy} from "../../data";

const MissedDocuments = ({documents}) => {

  console.log("documents", documents)

  const [modalInfo, setModalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleAccept = () => {
    // TODO MATO uloz dokument ako podpisany
    console.log('modalInfo', modalInfo);
    console.log('signing as', require_superior(modalInfo))

    if (require_superior(modalInfo) === false) {
      console.log('employee')
      fetchSign('/sign/', modalInfo.id)
    } else {
      console.log('superior')
      fetchSign('/sign/superior/', modalInfo.id)
    }

    setShowModal(false);
    // const doc = documents.find(d => d.id === modalInfo.id)
    // setDocs(docs.filter(d => d.id !== modalInfo.id));
  }

  const fetchSign = (url, id) => {
    fetch(`${proxy}${url}`, {
      method: "POST",
      body: JSON.stringify({id: id})
    })
      .then(response => response.json())
      .then(res => {
        console.log("succeeded")
      })
      .catch(() => console.log("something goes wrong"))
  }

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true
    }, {
      dataField: 'release_date.time',
      text: 'Release',
      formatter: FormattedRelease,
      sort: true
    }, {
      dataField: 'deadline.time',
      text: 'Deadline',
      formatter: FormattedDeadline,
      sort: true
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

  const expandColumns = [
    {
      dataField: 'employee.id',
      text: 'Employee ID'
    }, {
      dataField: 'employee.first_name',
      text: 'First name'
    }, {
      dataField: 'employee.last_name',
      text: 'Last Name'
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

  const defaultExpandSorted = [{
    dataField: 'employee.last_name',
    order: 'desc'
  }];

  const expandRow = {
    nonExpandable: nonExpandableDocs(documents),
    renderer: (cell, row) => (
      <BootstrapTable
        keyField="id"
        hover
        classes="inner-table"
        data={documents[row].signatures}
        columns={expandColumns}
        defaultSorted={ defaultExpandSorted }/>
    )
  };

  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

  return (
    <>
      <CaptionElement title="Documents to sign"/>
      <BootstrapTable
        keyField="id"
        hover
        data={documents}
        columns={columns}
        expandRow={expandRow}
        defaultSorted={ defaultSorted }
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