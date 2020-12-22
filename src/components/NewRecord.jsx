import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {ButtonGroup} from "reactstrap";
import NewDocument from "./Forms/NewDocument";
import NewTraining from "./Forms/NewTraining";
import EditableDocs from "./Lists/EditableDocs";

const NewRecord = () => {
  const [formType, setFormType] = useState('new_doc');
  const [formData, setFormData] = useState({}); // todo is it a good way?

  const divStyle = {
    padding: '0 5%',
  };

  return (
    <div style={divStyle}>
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
      {formType === 'new_doc'
        ? <NewDocument data={formData}/>
        : formType === 'new_training'
          ? <NewTraining data={formData}/>
          : <EditableDocs setFormType={setFormType} setFormData={setFormData}/>
      }
    </div>
  )
}

export default NewRecord;
