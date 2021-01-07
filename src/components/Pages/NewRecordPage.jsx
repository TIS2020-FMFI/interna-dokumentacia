import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {ButtonGroup} from "reactstrap";
import NewDocument from "../Forms/NewDocument";
import NewTraining from "../Forms/NewTraining";
import Editable from "../Tables/Editable";

const NewRecordPage = () => {
  const [formType, setFormType] = useState('new_doc');
  const [formData, setFormData] = useState({}); // TODO is there a better way?

  return (
    <div>
      <ButtonGroup className="btn-language" onClick={(e) => setFormType(e.target.id)}>
        <Button id="new_doc" className={`${formType === 'new_doc' && 'active'}`}>
          Document
        </Button>
        <Button id="new_training" className={`${formType === 'new_training' && 'active'}`}>
          Online training
        </Button>
        <Button id="editable" className={`${formType === 'editable' && 'active'}`}>
          Editable
        </Button>
      </ButtonGroup>
      {formType === 'new_doc' // TODO NewDocument is similar with NewTraining
        ? <NewDocument data={formData}/>
        : formType === 'new_training'
          ? <NewTraining data={formData}/>
          : <Editable setFormType={setFormType} setFormData={setFormData}/>
      }
    </div>
  )
}

export default NewRecordPage;
