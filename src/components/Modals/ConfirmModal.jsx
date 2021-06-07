import React from "react";
import {Button, Modal} from "react-bootstrap";

const ConfirmModal = ({showModal, setShowModal, modalInfo, handleAccept}) => {

  const closeModal = () => setShowModal(false);

  const onAccept = () => {
    handleAccept();
    closeModal();
  };

  const employeeName =()=> `${modalInfo.employee.first_name} ${modalInfo.employee.last_name}`

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalInfo.asSuperior
          ? <p>{`Do you really want do sign for ${employeeName()}`}</p>
          : <p>{`Do you really want do sign the document named ${modalInfo.name}`}</p>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onAccept}>Accept</Button>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal;
