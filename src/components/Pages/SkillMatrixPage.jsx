import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "../Others/CaptionElement";
import {Button, Row, Col, ButtonGroup} from "react-bootstrap";
import {sm_data, employees} from "../../data";
import ToggleBtn from "../Buttons/ToggleBtn";

const SkillMatrixPage = () => {

  const [data, setData] = useState(sm_data);

  const columns = [{
    dataField: 'name',
    text: ''
  }];

  // TODO MATO loadFromDB
  if (columns.length === 1) {
    employees.forEach(e => {
      columns.push({
        dataField: e.anet_id,
        text: e.name,
        formatter: ToggleBtn,
        formatExtraData: {
          data: data,
          setData: setData
        },
        headerStyle: () => {
          return { width: '39.17px' };
        }
      })
    })
  }

  const handleClick = (e) => {
    console.log('Handle btn click');
    console.log(e.target.id);
  };

  const handleExport = () => {
    console.log('export is not implemented')
  };

  // TODO JANO implement me

  return (
    <>
      <CaptionElement title="Strečno"/>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
      />

      <Row>
        {/* EXPORT */}
        <Col xs="6">
          <Button id="export" variant="secondary" onClick={handleExport}> Export </Button>
        </Col>
        {/* "submit" BUTTONS */}
        <Col xs="3">
          <ButtonGroup onClick={handleClick}>
            <Button id="sign"> Sign </Button>
            <Button id="cancelDuty"> Cancel duty </Button>
            <Button id="trainAgain"> Train again </Button>
            <Button id="cancel"> Cancel </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </>
  );
}

export default SkillMatrixPage;
