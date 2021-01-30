import React, {useState} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import DocumentForm from "../Forms/DocumentForm";
import TrainingForm from "../Forms/TrainingForm";
import EditableRecords from "../Tables/EditableRecords";

const AddRecordPage = () => {

  const [formType, setFormType] = useState('new_document');
  const [formData, setFormData] = useState({});

  const handleClick = (event) => {
    setFormType(event.target.id)
  };

  const active = (id) => {
    return formType === id && 'active';
  }

  return (
    <>
      <ButtonGroup onClick={handleClick} className="btn-header">
        <Button id="new_document" className={active("new_document")}>Document</Button>
        <Button id="new_training" className={active("new_training")}>Online training</Button>
        <Button id="editable_docs" className={active("editable_docs")}>Editable</Button>
      </ButtonGroup>

      { formType === 'new_document'
        ? <DocumentForm data={formData}/>
        : formType === 'new_training'
          ? <TrainingForm data={formData}/>
          : <EditableRecords
              setFormType={setFormType}
              setFormData={setFormData}
            />
      }
    </>
  )
}

export default AddRecordPage;
