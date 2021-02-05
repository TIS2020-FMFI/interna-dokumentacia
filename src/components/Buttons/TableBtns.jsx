import React from "react";
import {Button} from "react-bootstrap";
import {hasSubs, require_superior} from "../../functions";

export const MissedBtn = (cell, row, index, {setModalInfo, setShowModal}) => {

  const handleClick = () => {
    if (!require_superior(row)) {
      console.log(row)
      setModalInfo(row);
      setShowModal(true);
    }
  }

  return (
    <Button onClick={handleClick} size="sm" className="btn-block">
      {require_superior(row) ? 'Details' : 'Sign'}
    </Button>
  );
};

export const SignedBtn = (cell, row) => {

  return require_superior(row)
    ? <Button size="sm">Details</Button>
    : row.sign
};
