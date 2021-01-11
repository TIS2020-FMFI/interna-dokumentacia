import React from "react";
import {Form, Col, Row} from "react-bootstrap";
import {branches, divisions, departments, cities} from "../../data";

const CombinationForm = ({register}) => {

  // TODO JOZO implement dynamic generated options
  // note: ...according to requirements catalog

  const getSelectOptions = (field) => {
    return field.map(value => <option>{value}</option>);
  }

  return (
    <Col>

      {/* BRANCH */}
      <Form.Group as={Row}>
        <Form.Label>Branch</Form.Label>
        <Form.Control as="select" name="branch" ref={register}>
          <option hidden value="">Select option ...</option>
          { getSelectOptions(branches) }
        </Form.Control>
      </Form.Group>

      {/* DIVISION */}
      <Form.Group as={Row}>
        <Form.Label>Division</Form.Label>
        <Form.Control as="select" name="division" ref={register}>
          <option hidden value="">Select option ...</option>
          { getSelectOptions(divisions) }
        </Form.Control>
      </Form.Group>

      {/* DEPARTMENT */}
      <Form.Group as={Row}>
        <Form.Label>Department</Form.Label>
        <Form.Control as="select" name="department" ref={register}>
          <option hidden value="">Select option ...</option>
          { getSelectOptions(departments) }
        </Form.Control>
      </Form.Group>

      {/* CITY */}
      <Form.Group as={Row}>
        <Form.Label>City</Form.Label>
        <Form.Control as="select" name="city" ref={register}>
          <option hidden value="">Select option ...</option>
          { getSelectOptions(cities) }
        </Form.Control>
      </Form.Group>

    </Col>
  )
}

export default CombinationForm;