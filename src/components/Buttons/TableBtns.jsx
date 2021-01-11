import React from "react";
import {Button} from "react-bootstrap";

export const hasSubs = (row) => {
  return Object.keys(row).includes('sub');
};

export const MissingBtn = (c, row, i, {setModalInfo, setShowModal}) => {

  const handleClick = () => {
    if (!hasSubs(row)) {
      setModalInfo(row);
      setShowModal(true);
    }
  }

  return (
    <Button onClick={handleClick} size="sm">
      {hasSubs(row) ? 'Details' : 'Sign'}
    </Button>
  );
};

export const SignedBtn = (cell, row) => {
  return !hasSubs(row) ? row.sign : (
      <Button size="sm">Details</Button>
  );
};
