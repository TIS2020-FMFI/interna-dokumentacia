import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import SMBtn from "../Buttons/SMBtn";
import {documents} from "../../data";

const Found = () => {

  const columns = [
    {
      dataField: 'name',
      text: "Name",
    }, {
      dataField: 'release',
      text: 'Release',
    }, {
      dataField: 'type',
      text: 'Type'
    }, {
      dataField: 'division',
      text: 'Division'
    }, {
      dataField: 'department',
      text: 'Department'
    }, {
      dataField: 'city',
      text: 'City'
    }, {
      dataField: 'recordType',
      text: 'Record Type'
    }, {
      dataField: 'state',
      text: 'State'
    }, {
      dataField: 'edit',
      text: 'Edit',
      formatter: EditBtn,
      formatExtraData: { // FIXME JANO
        setFormType: undefined,
        setFormData: undefined
      },
      headerStyle: () => {
        return { width: '41.47px' };
      }
    }, {
      dataField: 'skillMatrix',
      text: 'SkillMatrix',
      formatter: SMBtn,
      headerStyle: () => {
        return { width: '75.53px' }; // FIXME JANO set in %
      }
    }
  ];

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={documents}
        columns={columns}
      />
    </>
  );
}

export default Found;

