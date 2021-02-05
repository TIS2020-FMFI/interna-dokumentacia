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
    console.log(data);
    console.log(filter);
  };

  const handleType = (data) => {
    const n = {...filter, type: data}
    console.log('new', n)
    setFilter({type: data, branch: [], city: []})
    console.log('filter', filter)
    const update = combinations.filter(c => data.includes(c.type))
    setCombination(update)
    console.log('combination', update)
    shrinkSelect(update)
  }

  function shrinkSelect(combinations) {
    setT(combinations)
    setB(combinations)
    setC(combinations)
  }

  function setT(combinations) {
    const t = [...new Set(combinations.map(c => c.type))]
    console.log('types', t)
    setTypes(t)
  }

  function setB(combinations) {
    const t = [...new Set(combinations.map(c => c.branch))]
    console.log('branches', t)
    setBranches(t);
  }

  function setC(combinations) {
    const t = [...new Set(combinations.map(c => c.city))]
    console.log('cities', t)
    setCities(t);
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

