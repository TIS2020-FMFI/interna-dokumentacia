import React from "react";
import {Button} from "react-bootstrap";

const SubmitBtns = ({handleSubmit, combinations}) => {

  const onSubmit = (data, event) => {
    event.target.id === "save"
      ? console.log("save", data)
      : console.log("save & send", data)
  }

  return(
    <div onClick={handleSubmit(onSubmit)}>
      <Button id="save" type="submit" className="mr-1">Save</Button>
      <Button id="send" type="submit" variant="danger">Send</Button>
    </div>
  );
};

export default SubmitBtns;
