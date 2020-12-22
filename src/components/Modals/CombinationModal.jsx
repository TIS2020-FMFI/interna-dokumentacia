import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";

const CombinationModal = ({showModal, setShowModal, combinations, setCombinations}) => {

  const {register, handleSubmit, reset} = useForm();

  const addNext = (data) => {
    setCombinations([...combinations, data]);
    reset(data);
  }

  const addClose = (data) => {
    setCombinations([...combinations, data]);
    closeModal();
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      backdrop="static"
      centered
      animation={false}
      >
      <Modal.Header closeButton>
        <Modal.Title>Add new combination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Row>
          {/* TYPE */}
          {/*<Form.Group as={Col}>*/}
          <Form.Label>Type</Form.Label>
          <Form.Control as="select" defaultValue="Choose..." name="type" ref={register}>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </Form.Control>
          {/*</Form.Group>*/}

          {/* BRANCH */}
          {/*<Form.Group as={Col}>*/}
          <Form.Label>Branch</Form.Label>
          <Form.Control as="select" defaultValue="Choose..." name="branch" ref={register}>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </Form.Control>
          {/*</Form.Group>*/}

          {/* DIVISION */}
          {/*<Form.Group as={Col}>*/}
          <Form.Label>Division</Form.Label>
          <Form.Control as="select" defaultValue="Choose..." name="division" ref={register}>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </Form.Control>
          {/*</Form.Group>*/}

          {/* DEPARTMENT */}
          {/*<Form.Group as={Col}>*/}
          <Form.Label>Department</Form.Label>
          <Form.Control as="select" defaultValue="Choose..." name="department" ref={register}>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </Form.Control>
          {/*</Form.Group>*/}

          {/* CITY */}
          {/*<Form.Group as={Col}>*/}
          <Form.Label>City</Form.Label>
          <Form.Control as="select" defaultValue="Choose..." name="city" ref={register}>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </Form.Control>
          {/*</Form.Group>*/}

        </Form.Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(addNext)}>AddNext</Button>
        <Button onClick={handleSubmit(addClose)}>Add&Close</Button>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CombinationModal;
