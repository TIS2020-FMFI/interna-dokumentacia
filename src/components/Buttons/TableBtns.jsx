import React from "react";
import {Button} from "react-bootstrap";
import {hasSubs} from "../../functions";

export const MissedBtn = (cell, row, index, {setModalInfo, setShowModal}) => {

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

/**
 * @return Sign Date or Details Button
 * */
export const SignedBtn = (cell, row) => {
  return !hasSubs(row)
    ? row.sign
    : (<Button size="sm">Details</Button>);
};
