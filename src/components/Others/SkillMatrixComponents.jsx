import React from "react";
import {Button, ButtonGroup, Col, Row, Badge} from "react-bootstrap";
import {ExclamationTriangle} from "react-bootstrap-icons";

export const RowButtons = ({setEvent, setShowModal, handleAccept, handleExport}) => {

  const handleClick = (e) => {
    if (e.target.id === "cancel") {
      handleAccept()
    } else {
      setShowModal(true)
    }
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
  // todo

  const style = (color, textColor="white") => {
    return {
      background: color,
      borderColor: color,
      color: textColor,
      width: "100px"
    }
  }

  // const Badge = ({color, textColor="white", text}) => {
  //   const style = {
  //     background: color,
  //     borderColor: color,
  //     color: textColor,
  //     width: "100px"
  //   }
  //
  //   return (<Button>badge</Button>)
  // }

  return (
    <div className="pt-5">
      <h5 className="pb-2">Legend:</h5>
      <p><Button style={style("gray")} size="sm">No need</Button>{' '}Zamestnanec bol odznačený z potreby oboznámenia alebo sa ho dokument netýka</p>
      <p><Button style={style("red")} size="sm">miss e+s</Button>{' '}Ani zamestnanec ani nadriadený ešte nepotvrdili</p>
      <p><Button style={style("orange")} size="sm">miss e</Button>{' '}Zamestnanec nepotvrdil</p>
      <p><Button style={style("yellow", "black")} size="sm">miss s</Button>{' '}Nadriadený nepotvrdil</p>
      <p><Button style={style("green")} size="sm">done</Button>{' '}Dokument je potvrdený</p>
      <p>hviezdička <strong>*</strong> znamena, ze zamestnanec sa opakovane preškoluje</p>
      <p><ExclamationTriangle style={{color: "red"}}/>{' '}Uplynul deadline a chýbajú podpisy</p>
    </div>
  )
}

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