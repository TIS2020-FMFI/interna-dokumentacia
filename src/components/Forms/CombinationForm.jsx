import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { CustomAlert } from "../CustomAlert";
import { PairContext } from "../../App";
import { getOptionsForSelect } from "../../utils/functions";

const CombinationForm = ({
  prefill,
  disabled,
  employees,
  combinations: cs,
  combination,
  setCombination,
  notification,
}) => {
  console.log(cs);

  const pairs = useContext(PairContext);
  const options = getOptionsForSelect(pairs);

  const handleSelect = (data, { name: field }) => {
    setCombination({ ...combination, [field]: data });
  };

  const selector = (name, label, opt = options[name]) => (
    <>
      {label}
      <Select
        isMulti={true}
        placeholder=""
        name={name}
        options={opt}
        defaultValue={prefill ? prefill[name] : []}
        isDisabled={
          (prefill && name !== "removedEmployees") || disabled.includes(name)
        }
        onChange={(data, e) => handleSelect(data, e)}
      />
      <br />
    </>
  );

  return (
    <Col className="p-0">
      {selector("branches", "Branches")}
      {selector("divisions", "Divisions")}
      {selector("departments", "Departments")}
      {selector("cities", "Cities")}
      {employees && selector("removedEmployees", "Remove employees", employees)}
      {notification && <CustomAlert notification={notification} />}
    </Col>
  );
};

export default CombinationForm;
