import React, {useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {MissedBtn} from "../Buttons/TableBtns";
import CaptionElement from "../Others/CaptionElement";
import ConfirmModal from "../Modals/ConfirmModal";
import EmptyTable from "./EmptyTable";

const MissedTrainings = ({trainings}) => {

  const columns = [
    {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'took_place',
      text: 'Took place'
    }, {
      dataField: 'signed_date',
      text: 'Signed date'
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
    </>
  )
}

export default MissedTrainings;