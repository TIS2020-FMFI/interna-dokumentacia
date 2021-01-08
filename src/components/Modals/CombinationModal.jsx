import React from "react";
import {Button, Container, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import CombinationForm from "../Forms/CombinationForm";

const CombinationModal = ({showModal, setShowModal, combinations, setCombinations}) => {

  const {register, handleSubmit} = useForm();

  const addNext = (data) => {
    setCombinations([...combinations, data]);
  }

  const addClose = (data) => {
    setCombinations([...combinations, data]);
    closeModal();
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Container className="pt-3 pb-3 pl-5 pr-5">
      <Modal.Header closeButton>
        <Modal.Title>Add new combination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CombinationForm register={register()}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(addNext)}>Add next</Button>
        <Button onClick={handleSubmit(addClose)}>Add and close</Button>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
      </Modal.Footer>
      </Container>
    </Modal>
  );
}

export default CombinationModal;
