import {Button} from "react-bootstrap";
import React from "react";

const SendBtn = (cell, row, index, {data, setMsg}) => {

  const handleClick = () => {
    // TODO MATO send the record to employees
    console.log("send", data[index]);
    setMsg(`Record ${data[index].name} was successfully sent`)
  }

  return(
    <Button id="save" variant="danger" size="sm" onClick={handleClick}>
      Send
    </Button>
  );
};

export default SendBtn;
