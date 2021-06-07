import React, { useContext, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { PairContext } from "../App";
import { getOptionsForSelect, resolveFilter } from "../utils/functions";

const initFilter = {
  branches: [],
  cities: [],
  departments: [],
  divisions: [],
};

const Filter = ({
  em,
  es,
  setEm,
  showSM,
  setShowSM,
  matrixByFilter,
  matrixBySuperior,
  searchByEmployee,
  searchByCombination,
}) => {
  const [filter, setFilter] = useState(initFilter);

  const pairs = useContext(PairContext);
  const options = getOptionsForSelect(pairs);

  const bref = useRef();
  const diref = useRef();
  const deref = useRef();
  const cref = useRef();
  const eref = useRef();

  const resetFilter = () => {
    setFilter(initFilter);
    // bref.current.select.clearValue();
    // diref.current.select.clearValue();
    // cref.current.select.clearValue();
    // deref.current.select.clearValue();
  };

  const resetHalfOfFilter = () => {
    setFilter((prev) => {
      return {
        branches: [],
        cities: prev.cities,
        departments: prev.departments,
        divisions: [],
      };
    });
    // bref.current.select.clearValue();
    // diref.current.select.clearValue();
  };

  const resetEmployee = () => {
    setEm(undefined);
    eref.current.select.clearValue();
  };

  const handleSelect = (data, { name: field }) => {
    resetEmployee();
    setFilter({ ...filter, [field]: data });
  };

  const handleSearch = () => {
    resetEmployee();

    if (!showSM) {
      searchByCombination(resolveFilter(filter));
      return;
    }

    resetHalfOfFilter();
    matrixByFilter({
      branch: "",
      city: filter.cities.map((v) => v.value).join(","),
      department: filter.departments.map((v) => v.value).join(","),
      division: "",
    });
  };

  const handleEmployeeSearch = (data) => {
    if (!data) return;
    setEm(data);
    resetFilter();
    if (showSM) {
      matrixBySuperior(data);
    } else {
      searchByEmployee(data);
    }
  };

  const handleToggleSearch = () => {
    const toggle = !showSM;
    if (toggle) {
      if (em) {
        matrixBySuperior(em);
      } else {
        resetHalfOfFilter();
        matrixByFilter({
          branch: "",
          city: filter.cities.map((v) => v.value).join(","),
          department: filter.departments.map((v) => v.value).join(","),
          division: "",
        });
      }
    } else {
      if (em) {
        handleEmployeeSearch(em);
      } else {
        handleSearch();
      }
    }

    setShowSM(toggle);
  };

  const selector = (name, label, ref) => (
    <Col>
      <Select
        isMulti
        value={filter[name]}
        name={name}
        placeholder={label}
        options={options[name]}
        onChange={(data, e) => handleSelect(data, e)}
        ref={ref}
      />
    </Col>
  );

  return (
    <Form>
      Search by combination
      <Row className="pb-2">
        {selector("branches", "Branches", bref)}
        {selector("divisions", "Divisions", diref)}
        {selector("departments", "Departments", deref)}
        {selector("cities", "Cities", cref)}
        <Button onClick={handleSearch}>Search</Button>
      </Row>
      <Row>
        <Col xs="3">
          Search by employee
          <Select
            value={em}
            name="employeeName"
            placeholder="Employee Name"
            options={es}
            onChange={(data) => handleEmployeeSearch(data)}
            ref={eref}
          />
        </Col>
        <Col className="text-right pr-0">
          <Button
            className="mr-3"
            variant="outline-primary"
            onClick={handleToggleSearch}
          >
            {`Show ${showSM ? "table" : "skillMatrix"}`}
          </Button>
          <Button className="ml-1" disabled>
            Export
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
