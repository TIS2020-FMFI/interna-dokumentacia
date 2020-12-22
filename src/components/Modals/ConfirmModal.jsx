import React from "react";
import {Button, Modal} from "react-bootstrap";

const ConfirmModal = ({showModal, setShowModal, modalInfo, handleAccept}) => {

  const onAccept = () => {
    handleAccept();
    closeModal();
  };
  const closeModal = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalInfo.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onAccept}>Accept</Button>
        <Button variant="secondary" onClick={closeModal}>Reject</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal;
