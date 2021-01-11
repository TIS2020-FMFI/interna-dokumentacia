import React from "react";
import {Button, Form} from "react-bootstrap";
import Filter from "../Others/Filter";
import FoundRecords from "../Tables/FoundRecords";

const FinderPage = () => {
  return (
    <div style={{marginTop: '1%'}}>
      <Filter/>
      <FoundRecords/>
      <Form.Group>
        {/* TODO PATO export */}
        <Button className="mr-1">Export</Button>
        <Button>Reset Filter</Button>
      </Form.Group>
    </div>
  )
}

export default FinderPage;
