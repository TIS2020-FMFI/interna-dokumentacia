import React, {useState} from 'react';
import {Button, ButtonGroup, Container} from 'react-bootstrap';
import DocumentForm from "../components/Forms/DocumentForm";
import TrainingForm from "../components/Forms/TrainingForm";

const AddRecordPage = () => {

  const [formType, setFormType] = useState('document');

  const handleClick = event => setFormType(event.target.id)
  const active = id => formType === id && 'active'

  return (
    <Container className="w-75">
      <ButtonGroup onClick={handleClick} className="btn-group btn-header">
        <Button id="document" className={active("document")}>Document</Button>
        <Button id="training" className={active("training")}>Online training</Button>
      </ButtonGroup>
      {formType === 'document' && <DocumentForm /> }
      {formType === 'training' && <TrainingForm /> }
    </Container>
  )
}

export default AddRecordPage;
