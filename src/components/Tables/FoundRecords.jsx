import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import EditBtn from "../Buttons/EditBtn";
import SMBtn from "../Buttons/SMBtn";
import {docs} from "../../data";
import DocumentForm from "../Forms/DocumentForm";
import TrainingForm from "../Forms/TrainingForm";
import SavedRecords from "./SavedRecords";
import EditRecordModal from "../Modals/EditRecordModal";

const FoundRecords = () => {

  const [formType, setFormType] = useState('');
  const [formData, setFormData] = useState({});

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
        setFormType: setFormType,
        setFormData: setFormData
      },
      headerStyle: () => {return {width: '1%'}}
    }, {
      dataField: 'skillMatrix',
      text: 'SkillMatrix',
      formatter: SMBtn,
      headerStyle: () => { return {width: '1%'} }
    }
  ];

  const doc_form = () => {
    return <DocumentForm data={formData}/>
  }

  const train_form = () => {
    return <TrainingForm data={formData}/>
  }

  return (
    <>
      <BootstrapTable
        keyField="id"
        hover
        data={docs}
        columns={columns}
      />
      {formType === 'new_document' &&
        <EditRecordModal
          form={doc_form}
          setFormType={setFormType}
        />
      }
      {formType === 'new_training' &&
        <EditRecordModal
          form={train_form}
          setFormType={setFormType}
        />
      }
      {/*{ formType === 'new_training' && <TrainingForm data={formData}/> }*/}
    </>
  );
};

export default FoundRecords;

