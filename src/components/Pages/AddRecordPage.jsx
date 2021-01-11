import React, {useState} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import DocumentForm from "../Forms/DocumentForm";
import TrainingForm from "../Forms/TrainingForm";
import Editable from "../Tables/Editable";

const AddRecordPage = () => {

  const [formType, setFormType] = useState('new_doc');
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
        <Button id="new_doc" className={active("new_doc")}>Document</Button>
        <Button id="new_training" className={active("new_training")}>Online training</Button>
        <Button id="editable" className={active("editable")}>Editable</Button>
      </ButtonGroup>

      {formType === 'new_doc'
        ? <DocumentForm data={formData}/>
        : formType === 'new_training'
          ? <TrainingForm data={formData}/>
          : <Editable
              setFormType={setFormType}
              setFormData={setFormData}
            />
      }
    </>
  )
}

export default AddRecordPage;
