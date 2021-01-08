import React from "react";
import {Form, Col, Row} from "react-bootstrap";
import {types, branches} from "../../data";

const CombinationForm = ({register}) => {

  // TODO JOZO set default values to each Form.Control as="select"
  // TODO JOZO implement dynamic generated options
  // note: ... according to requirement

  return (
    <Col>
      {/* TYPE */}
      <Form.Group as={Row}>
        <Form.Label>Type</Form.Label>
        <Form.Control as="select" defaultValue="Choose..." name="type" ref={register}>
          { types.map(type => <option>{type}</option> )}
        </Form.Control>
      </Form.Group>

      {/* BRANCH */}
      <Form.Group as={Row}>
      <Form.Label>Branch</Form.Label>
      <Form.Control as="select" defaultValue="Choose..." name="branch" ref={register}>
        { branches.map(branch => <option>{branch}</option> )}
      </Form.Control>
      </Form.Group>

      {/* DIVISION */}
      <Form.Group as={Row}>
      <Form.Label>Division</Form.Label>
      <Form.Control as="select" defaultValue="Choose..." name="division" ref={register}>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Form.Control>
      </Form.Group>

      {/* DEPARTMENT */}
      <Form.Group as={Row}>
      <Form.Label>Department</Form.Label>
      <Form.Control as="select" defaultValue="Choose..." name="department" ref={register}>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Form.Control>
      </Form.Group>

      {/* CITY */}
      <Form.Group as={Row}>
      <Form.Label>City</Form.Label>
      <Form.Control as="select" defaultValue="Choose..." name="city" ref={register}>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Form.Control>
      </Form.Group>

    </Col>
  )
}

export default CombinationForm;