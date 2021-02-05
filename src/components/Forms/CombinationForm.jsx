import React from "react";
import {Form, Col, Row} from "react-bootstrap";
import {branches, divisions, departments, cities} from "../../data";
import {getSelectOptions} from "../../functions";

const CombinationForm = ({register}) => {

  // TODO JOZO implement dynamic generated options
  // note: ...according to requirements catalog

  return (
    <Col>

      {/* BRANCH */}
      <Form.Group as={Row}>
        <Form.Label>Branch</Form.Label>
        <Form.Control as="select" name="branch" ref={register}>
          { getSelectOptions(branches) }
        </Form.Control>
      </Form.Group>

      {/* DIVISION */}
      <Form.Group as={Row}>
        <Form.Label>Division</Form.Label>
        <Form.Control as="select" name="division" ref={register}>
          { getSelectOptions(divisions) }
        </Form.Control>
      </Form.Group>

      {/* DEPARTMENT */}
      <Form.Group as={Row}>
        <Form.Label>Department</Form.Label>
        <Form.Control as="select" name="department" ref={register}>
          { getSelectOptions(departments) }
        </Form.Control>
      </Form.Group>

      {/* CITY */}
      <Form.Group as={Row}>
        <Form.Label>City</Form.Label>
        <Form.Control as="select" name="city" ref={register}>
          { getSelectOptions(cities) }
        </Form.Control>
      </Form.Group>

    </Col>
  )
}

export default CombinationForm;