import {Button} from "react-bootstrap";
import React from "react";
import {hasSubs} from "../../functions";

const EditBtn = (cell, row, rowIndex, {setFormData, setFormType}) => {

  const handleClick = () => {
    setFormData(row);       // FIXME TypeError: setFormData is not a function
    hasSubs(row) ? setFormType("new_doc") : setFormType("new_training");
  }

  return (
    <Button onClick={handleClick} size="sm" id="editBtn">Edit</Button>
  );
};

export default EditBtn;
