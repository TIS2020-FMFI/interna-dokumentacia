import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import Filter from "../Others/Filter";
import Found from "../Tables/Found";

const FinderPage = () => {
  return (
    <div style={{marginTop: '1%'}}>
      {/* TODO merge Filter with Found via Storybook */}
      <Filter/>
      <Found/>
      {/* TODO missing functionality */}
      <Form.Group>
        <Button>Export</Button>
        <Button>Reset Filter</Button>
      </Form.Group>
    </div>
  )
}

export default FinderPage;
