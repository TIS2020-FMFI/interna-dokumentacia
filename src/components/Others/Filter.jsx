import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {combinations as combi} from "../../data";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const Filter = () => {

  const [combinations, setCombination] = useState(combi)

  const [types, setTypes] = useState([...new Set(combinations.map(c => c.type))]);
  const [branches, setBranches] = useState([...new Set(combinations.map(c => c.branch))]);
  const [cities, setCities] = useState([...new Set(combinations.map(c => c.city))]);

  useEffect(()=>{

  })

  const [filter, setFilter] = useState({
    type: [],
    branch: [],
    city: []
  });

  const handleSubmit = (data) => {
    // tu uz prebehne search
    console.log(data);
    console.log(filter);
  };

  const handleType = (data) => {
    const n = {...filter, type: data}
    console.log(n)
    setFilter({type: data, branch: [], city: []})
    // tu pridam vybrane data a ulozim to do filtra, ktory mam vyklikany
    console.log('filter', filter)
    const update = combinations.filter(c=>data.includes(c.type))
    setCombination(update)
    console.log('combination', update)
    shrinkSelect()
  }

  function shrinkSelect() {
    setT()
    setB()
    setC()
  }

  function setT() {
    setTypes([...new Set(combinations.map(c => c.type))])
  }

  function setB() {
    setBranches([...new Set(combinations.map(c => c.branch))]);
  }

  function setC() {
    setCities([...new Set(combinations.map(c => c.city))]);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <DropdownMultiselect
          name="type"
          options={types}
          // handleOnChange={handleChange}
          handleOnChange={handleType}
        />
        <DropdownMultiselect
          name="branch"
          options={branches}
          // handleOnChange={handleChange}
        />
        <DropdownMultiselect
          name="city"
          options={cities}
          // handleOnChange={handleChange}
        />
        <Form.Group as={Col} className={"align-items-end"}>
          <Button type="submit">Search</Button>
        </Form.Group>
      </Row>
    </Form>
  )
}

export default Filter;

