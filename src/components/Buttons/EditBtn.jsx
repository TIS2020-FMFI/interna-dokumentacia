import {Button} from "react-bootstrap";
import React from "react";
import {hasSubs, recordType} from "../../functions";

const EditBtn = (cell, row, rowIndex, {setFormData, setFormType}) => {

  const handleClick = () => {
    setFormData(row);
    // FIXME do not redirect after click on document
    console.log("edit")
    recordType(row) === "doc" ? setFormType("new_doc") : setFormType("new_training");
  }

  return (
    <Button onClick={handleClick} size="sm" id="editBtn">Edit</Button>
  );
};

export default EditBtn;
