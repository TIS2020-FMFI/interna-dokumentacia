import {Button} from "react-bootstrap";
import React from "react";

const SMBtn = (cell, row) => {

  const handleClick = () => {
    console.log('Show SM') // TODO JANO implement me
  }

  return(
    <Button onClick={handleClick} size={"sm"}>
      Show SM
    </Button>
  );
};

export default SMBtn;
