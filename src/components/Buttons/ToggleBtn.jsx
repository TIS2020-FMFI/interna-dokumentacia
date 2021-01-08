import {Button} from "react-bootstrap";
import React from "react";

let counter = 0;

const ToggleBtn = (c, row, rowIndex, {data, setData}) => {
  // FIXME JANO
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

export default ToggleBtn;