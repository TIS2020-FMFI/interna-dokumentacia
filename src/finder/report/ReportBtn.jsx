import React from "react";
import { Button } from "react-bootstrap";
import { redirectTo } from "../../utils/functions";
import { useHistory } from "react-router-dom";

const ReportBtn = (cell, row) => {
  // const history = useHistory()

  const handleClick = () => {
    redirectTo(`/report/?id=${row.id}`);
    // history.push({
    //   pathname: '/report',
    //   state: { id: row.id },
    // });
  };

  return (
    <Button onClick={handleClick} size="sm">
      report
    </Button>
  );
};

export default ReportBtn;
