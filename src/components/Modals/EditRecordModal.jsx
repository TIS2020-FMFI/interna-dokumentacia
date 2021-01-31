import React from "react";
import Modal from "react-bootstrap/Modal";

const EditRecordModal = ({setFormType, form}) => {

  const closeModal = () => setFormType('');

  return (
    <Modal show={true} onHide={closeModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {form()}
      </Modal.Body>
    </Modal>
  )
}

export default EditRecordModal;
