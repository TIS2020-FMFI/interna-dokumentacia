import {Button} from "react-bootstrap";
import React from "react";

const EditBtn = (cell, row, rowIndex, {setFormData, setFormType}) => {
  const handleClick = () => {
    setFormData(row);       // TODO TypeError: setFormData is not a function
    setFormType("new_doc"); // TODO detect new_doc or new_training
  }
  return (
    <Button onClick={handleClick} size="sm">
      Edit
    </Button>
  );
};

export default EditBtn;
