import React from "react";
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import {ExclamationTriangle} from "react-bootstrap-icons";

export const RowButtons = ({setEvent, setShowModal, handleExport}) => {

  const handleClick = (e) => {
    setShowModal(true)
    setEvent(e.target.id)
  }

  return (
    // TODO JOZO prettify
    <Row>
      <Col xs="7">
        <Button id="export" variant="secondary" onClick={handleExport}>Export</Button>
      </Col>
      <ButtonGroup onClick={handleClick} className="ml-5">
        <Button id="sign" className="mr-1">Sign</Button>
        <Button id="cancelDuty" className="mr-1">Cancel duty</Button>
        <Button id="trainAgain" className="mr-1">Train again</Button>
        <Button id="cancel"> Cancel </Button>
      </ButtonGroup>
    </Row>
  )
}

export const Legend = () => {
  return (
    <div className="pt-5">
      <h5>Legend: TODO</h5>
      {/*<h6><Badge variant="secondary">no need</Badge> Example heading</h6>*/}
      {/*<h6><Badge variant="danger">not signed</Badge> Example heading</h6>*/}
      {/*<h6><Badge variant="warning">superior not signed</Badge> Example heading</h6>*/}
    </div>
  )
};

export const DocumentLabel = (col, row, index, {data}) => {

  const doc = data[index]

  function expired(){
    return doc.deadline < Date.now() && doc.employees.find(e => e.state.includes("e") || e.state.includes("s"))
  }

  return (
    <>
      {expired()
        ? <h5><ExclamationTriangle style={{color: "red"}}/>{" "}{doc.name}</h5>
        : <p>{doc.name} </p>
      }
    </>
  )
}