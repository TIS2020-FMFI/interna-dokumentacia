import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "../Others/CaptionElement";
import {Button, Row, Col, Container, ButtonGroup} from "react-bootstrap";
import {sm_data, employees} from "../../data";
import ToggleBtn from "../Buttons/ToggleBtn";

const SkillMatrixPage = () => {

  const [data, setData] = useState(sm_data);

  const columns = [{
    dataField: 'name',
    text: 'Document Name'
  }];

  let counter = 0;

  // TODO MATO load skill matrix data from DB
  if (columns.length === 1) {
    employees.forEach(e => {
      columns.push({
        dataField: e.anet_id,
        text: e.name,
        formatter: ToggleBtn,
        formatExtraData: {
          data: data,
          setData: setData,
          id: (counter++ % employees.length)
        },
        headerStyle: () => { return {width: '1%'} }
      })
    })
  }

  const handleClick = (e) => {
    console.log('Handle btn click');
    console.log(e.target.id);
    console.log(data);
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

      {/* TODO JOZO prettify */}
      <Row>
        {/* EXPORT TODO PATO */}
        <Col xs="7">
          <Button id="export" variant="secondary" onClick={handleExport}> Export </Button>
        </Col>
        {/* ACTION BUTTONS */}
          <ButtonGroup onClick={handleClick} className="ml-5">
            <Button id="sign" className="mr-1"> Sign </Button>
            <Button id="cancelDuty" className="mr-1"> Cancel duty </Button>
            <Button id="trainAgain" className="mr-1"> Train again </Button>
            <Button id="cancel"> Cancel </Button>
          </ButtonGroup>
      </Row>
    </>
  );
}

export default SkillMatrixPage;
