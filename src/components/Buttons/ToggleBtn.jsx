import React from "react";
import {Button} from "react-bootstrap";

// FIXME JANO
const ToggleBtn = (c, row, rowIndex, {data, setData, id}) => {

  const document = data[rowIndex]
  const anet_id = document.employees[id].anet_id;
  let state = document.employees[id].state;
  const mark = state.includes('X');
  if (mark) state = unMarkState();

  function markState() {
    console.log("mark")
    return 'X' + state
  }

  function unMarkState() {
    console.log("un")
    if (state.length === 1 && state !== 'X')
      return state
    return state.substr(1)
  }

  const handleClick = () => {
    const stt = mark ? unMarkState() : markState()

    const new_employees = [...document.employees];
    new_employees[id] = {
      anet_id: anet_id,
      state: stt
    };
    console.log(stt)
    const new_data = [...data];
    new_data[rowIndex] = {...document, employees: new_employees};

    setData(new_data);
  }

  const getColor = (state) => {
    switch (state){
      case "-": return 'gray'
      case "es": return 'red'
      case "e": return 'orange'
      case "s": return 'yellow'
      default: return 'green'
    }
  }

  const getLabel = () => {
    // TODO create better labels
    const labels = [
      {state: "-", label: "no need"},
      {state: "es", label: "miss e+s"},
      {state: "e", label: "miss e"},
      {state: "s", label: "miss s"},
      {state: "", label: "done"},
      {state: "X", label: "bug"},
    ]
    return labels.find(l => l.state === state).label
  }

  const styledBtn = {
    backgroundColor: getColor(state),
    borderColor: mark ? "black" : "white",
    borderWidth: "5px",
  }

  return (
    <Button style={styledBtn} onClick={handleClick}>
      {getLabel()}
    </Button>
  )
}

export default ToggleBtn;