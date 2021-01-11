import {Button} from "react-bootstrap";
import React from "react";

const SendBtn = (cell, row, index, {data}) => {

  const handleClick = () => {
    // TODO MATO send the record
    console.log("send", data[index]);
  }

  return(
    <Button
      id="save" variant="danger" size="sm"
      onClick={handleClick}>Send</Button>
  );
};

export default SendBtn;
