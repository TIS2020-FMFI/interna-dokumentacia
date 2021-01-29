import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {branches, cities, types} from "../../data";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const Filter = () => {

  const [combinations, setCombination] = useState([
    // tu mam nejak ulozene vsetky moznosti, ktore viem vyklikat v Dropdown
  ]);

  // filter =
  const [filter, setFilter] = useState({
    // filter, ktory prave tvorim / vyberam
    // zrejme ma podobnu strukturu ako combinations
  });

  const handleSubmit = (data) => {
    // tu uz prebehne search
    console.log(data);
    console.log(filter);
  };

  const handleChange = (data, key) => {
    // tu pridam vybrane data a ulozim to do filtra, ktory mam vyklikany
    shrinkCombinations();
  }

  const shrinkCombinations = () => {
    // potom je este dolezite zuzit vsetky moznosti, ktore viem vyklikat v Dropdown
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <DropdownMultiselect
          name="type"
          options={types}
          handleOnChange={handleChange}
          // handleOnChange={(data) => handleChange(data, 'type')}
        />
        <DropdownMultiselect
          name="branch"
          options={branches}
          handleOnChange={handleChange}
        />
        <DropdownMultiselect
          name="city"
          options={cities}
          handleOnChange={handleChange}
        />
        <Form.Group as={Col} className={"align-items-end"}>
          <Button type="submit">Search</Button>
        </Form.Group>
      </Row>
    </Form>
  )
}

export default Filter;

