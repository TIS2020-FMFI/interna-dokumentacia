import React, {useState} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import CaptionElement from "./Secondary/CaptionElement";
import {Button, Row, Col} from "react-bootstrap";
import {ButtonGroup} from "reactstrap";
import {employees} from "../data";

// todo doc with employees or employee with docs?
const documents = [
  {
    id: 1,
    name: 'Document1',
    employees: [
      {
        anet_id: '1',
        state: 'A'
      }, {
        anet_id: '2',
        state: 'B'
      }, {
        anet_id: '3',
        state: 'A'
      }
    ]
  }, {
    id: 2,
    name: 'Document2',
    employees: [
      {
        anet_id: '1',
        state: 'B'
      }, {
        anet_id: '2',
        state: 'A'
      }, {
        anet_id: '3',
        state: 'A'
      }
    ]
  }, {
    id: 3,
    name: 'Document3',
    employees: [
      {
        anet_id: '1',
        state: 'A'
      }, {
        anet_id: '2',
        state: 'B'
      }, {
        anet_id: '3',
        state: 'B'
      }
    ]
  }
];

let counter = 0;

const SkillMatrix = () => {

  const [data, setData] = useState(documents);

  const ToggleBtn = (_, row, rowIndex) => {
    // console.log(counter)

    const document = data[rowIndex]
    const employee = document.employees[counter++ % 3];
    const mark = employee.state.substring(1, 2) === 'X';
    const state = mark ? employee.state.substring(0,1) : employee.state;

    console.log(document);

    const handleClick = () => {
      let new_data = [...data];
      let new_employees = [...document.employees];

      new_employees[counter % 3] = {
        employee,
        state: mark ? employee.state.substring(0,1) : employee.state + 'X'
      };

      new_data[rowIndex] = {...document, employees: new_employees};

      setData(new_data);
    }

    const styledBtn = {
      backgroundColor: state === 'A'
        ? 'orange'
        : state === 'B'
          ? 'red'
          : 'blue',
      borderColor: mark ? "black" : "white",
      borderWidth: "3px"
    }

    return (
      <Button style={styledBtn} onClick={handleClick}>
        {state}
      </Button>
    )
  }

  const columns = [{
    dataField: 'name',
    text: ''
  }];

  // todo loadFromDB
  if (columns.length === 1) {
    employees.forEach(e => {
      columns.push({
        dataField: e.anet_id,
        text: e.name,
        formatter: ToggleBtn
      })
    })
  }

  const handleClick = (e) => {
    console.log('Handle btn click');
    console.log(e.target.id);
  };

  const handleExport = () => {
    // todo export to CSV?
    console.log('export is not implemented')
  };

  return (
    <>
      <CaptionElement title="Skill-matrix"/>
      <BootstrapTable
        classes="docs" // custom class
        keyField="id"
        data={data}
        columns={columns}
      />

      <Row style={{marginLeft: '10%'}}>
        {/* EXPORT */}
        <Col xs="6">
          <Button id="export" variant="secondary" onClick={handleExport}> Export </Button>
        </Col>
        {/* SAVE | CANCEL */}
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

export default SkillMatrix;
