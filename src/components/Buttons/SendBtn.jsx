import {Button} from "react-bootstrap";
import React from "react";

const SendBtn = ({handleSubmit}) => {

  const onSubmit = (data) => {
    // TODO JANO use it in Editable.jsx as a column
    console.log("save", data);
  }

  return(
    <Button id="save" type="submit" className="mr-1" onClick={handleSubmit(onSubmit)}>Save</Button>
  );
};

export default SendBtn;
