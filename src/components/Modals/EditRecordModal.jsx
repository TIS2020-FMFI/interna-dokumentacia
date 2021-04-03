import React from "react";
import Modal from "react-bootstrap/Modal";
import DocumentForm from "../Forms/DocumentForm";
import TrainingForm from "../Forms/TrainingForm";
import { recordType } from "../../utils/functions";

const EditRecordModal = ({ setRecords, formData, setFormData, actual }) => {
  const closeModal = () => setFormData(undefined);
  const type = recordType(formData);

  const props = { setRecords, formData, setFormData, actual };

  return (
    <Modal show={true} onHide={closeModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit {type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === "document" ? (
          <DocumentForm {...props} />
        ) : (
          <TrainingForm {...props} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditRecordModal;
