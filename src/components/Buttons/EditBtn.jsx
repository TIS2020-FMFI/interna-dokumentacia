import React from "react";
import Button from "react-bootstrap/Button";

const EditBtn = (cell, row, index, { setFormData }) => {
  const handleClick = () => setFormData(row);

  return (
    <Button variant="outline-primary" onClick={handleClick} size="sm">
      Edit
    </Button>
  );
};

export default EditBtn;
