import React from "react";
import Button from "react-bootstrap/Button";
import {
  badMsg,
  goodMsg,
  recordType,
  successResponse,
} from "../../utils/functions";
import { proxy_url } from "../../utils/data";

const SendBtn = (cell, row, index, { setSavedRec, setNotification }) => {
  /** Send record to relevant employees */
  const handleClick = () => {
    fetch(proxy_url + `${recordType(row)}/confirm/${row.id}`, {
      method: "GET",
    })
      .then((res) => {
        if (successResponse(res)) {
          updateSavedRec();
          setNotification(goodMsg(`Record ${row.name} was successfully sent`));
        } else {
          setNotification(badMsg(`Sending the ${row.name} failed`));
        }
      })
      .catch((e) => console.log(e));
  };

  const updateSavedRec = () => {
    setSavedRec((prev) => prev.filter((rec) => rec.id !== row.id));
  };

  return (
    <Button id="save" size="sm" onClick={handleClick}>
      Send
    </Button>
  );
};

export default SendBtn;
