import React from "react";
import {Button} from "react-bootstrap";

const ToggleBtn = (c, row, rowIndex, {data, setData, id}) => {

  const document = data[rowIndex]
  const signature = document.signatures[id]
  let state = getState(signature);
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

    const new_signatures = [...document.signatures];
    new_signatures[id] = {
      ...new_signatures[id],
      state: stt
    };
    console.log(stt)
    const new_data = [...data];
    new_data[rowIndex] = {...document, signatures: new_signatures};

    setData(new_data);
  }

  const styledBtn = {
    backgroundColor: getColor(state),
    borderColor: mark ? "black" : "white",
    borderWidth: "5px",
  }

  return (
    <Button style={styledBtn} onClick={handleClick}>
      {getLabel(state)}
    </Button>
  )
}

export default ToggleBtn;


const getState = (signature) => { // TODO TEST
  if (signature.cancel) {
    return "-"
  }
  if (signature.training) {
    if (signature.s_date === null && signature.e_date === null) return "es"
    if (signature.s_date === null && signature.e_date !== null) return "s"
  }
  if (signature.e_date === null) {
    return "e"
  }
  return ""
}

const getColor = (state) => {
  switch (state){
    case "-": return 'gray'
    case "es": return 'red'
    case "e": return 'orange'
    case "s": return 'golden'
    default: return 'green'
  }
}

const getLabel = (state) => {
  // TODO create better labels
  return [
    {state: "-", label: "no needed"},
    {state: "es", label: "miss e+s"},
    {state: "e", label: "miss e"},
    {state: "s", label: "miss s"},
    {state: "", label: "well done"},
    {state: "X", label: "some bug"},
  ].find(l => l.state === state).label
}