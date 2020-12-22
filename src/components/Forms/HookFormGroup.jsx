import {Col, Form, Row} from "react-bootstrap";
import React from "react";

const HookFormGroup = (props) => {
  const {label, name, placeholder, type, register, as, defaultValue} = props
  return (
      <Form.Group as={Row}>
        <Form.Label column sm="2">{label}</Form.Label>
        <Col>
          <Form.Control
            name={name}
            placeholder={placeholder}
            ref={register}
            defaultValue={defaultValue}
            type={type !== undefined ? type : ""} // todo ?: &&
            // as={as !== undefined ? as : ""}
          />
        </Col>
      </Form.Group>
    );
}

export default HookFormGroup;
