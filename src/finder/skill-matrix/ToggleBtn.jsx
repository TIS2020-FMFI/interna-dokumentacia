import React from "react";
import { Button } from "react-bootstrap";

const ToggleBtn = (c, row, rowIndex, { id, data, setData, i }) => {
  const document = data[rowIndex];
  let state = document.employees[i]?.state;
  const mark = state.includes("X");
  if (mark) state = unMarkState();

  function markState() {
    return "X" + state;
  }

  function unMarkState() {
    if (!state.includes("X")) return state;
    if (state.length === 1 && state !== "X") return state;
    return state.substr(1);
  }

  const handleClick = () => {
    const stt = mark ? unMarkState() : markState();
    console.log(stt);

    const new_employees = [...document.employees];
    new_employees[i] = {
      ...new_employees[i],
      state: stt,
    };

    const copy = [...data];
    copy[rowIndex] = { ...document, employees: new_employees };
    setData(copy);
  };

  const getColor = (state) => {
    switch (state) {
      case "-":
        return "gray";
      case "_":
        return "cornflowerblue";
      case "es":
        return "tomato";
      case "e":
        return "orange";
      case "s":
        return "gold";
      default:
        return "green";
      // TODO ME implement *
    }
  };

  const getLabel = () => {
    const labels = [
      { state: "-", label: "no need" },
      { state: "es", label: "miss e+s" },
      { state: "e", label: "miss e" },
      { state: "s", label: "miss s" },
      { state: "", label: "well done" },
      { state: "X", label: "bug" },
      { state: "_", label: "not send" },
    ];
    return labels.find((l) => l.state === state)?.label;
  };

  const styledBtn = {
    backgroundColor: getColor(state),
    color: state === "s" ? "black" : "white",
    borderColor: mark ? "black" : "white",
    borderWidth: "5px",
  };

  return (
    <Button style={styledBtn} onClick={handleClick} className="btn-block">
      {getLabel()}
    </Button>
  );
};

export default ToggleBtn;
