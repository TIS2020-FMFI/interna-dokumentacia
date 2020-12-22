import React from "react";
import {Button} from "react-bootstrap";

const ListBtn = ({row, hasSubs, setModalInfo, setShowModal}) => {
  const handleClick = (row) => {
    if (!hasSubs(row)) {
      setModalInfo(row);
      setShowModal(true);
    }
  }
  return (
    <Button onClick={() => handleClick(row)}>
      {hasSubs(row) ? 'Details' : 'Sign'}
    </Button>
  );
};

export default ListBtn;
