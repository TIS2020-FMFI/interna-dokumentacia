import React from "react";
import {Button} from "react-bootstrap";

// FIXME JANO
const ToggleBtn = (c, row, rowIndex, {data, setData, id}) => {

  const document = data[rowIndex]
  const anet_id = document.employees[id].anet_id;
  let state = document.employees[id].state;
  const mark = state.includes('X');
  if (mark) state = state.substring(0, 1);

  const handleClick = () => {
    const new_employees = [...document.employees];
    new_employees[id] = {
      anet_id: anet_id,
      state: mark ? state.substring(0,1) : state + 'X'
    };

    const new_data = [...data];
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
    borderWidth: "5px",
  }

  return (
    <Button style={styledBtn} onClick={handleClick}>
      {state}
    </Button>
  )
}

export default ToggleBtn;