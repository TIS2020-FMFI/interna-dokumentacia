import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Col, Form, Row} from "react-bootstrap";
import {branches, cities, combinations, departments, divisions, documents, employees, types} from "../../data";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const Filter = () => {

  // TODO JANO implement me

  const {register, handleSubmit} = useForm();
  const [combinations, setCombination] = useState([]);
  const [filter, setFilter] = useState({
    type: [],
    branch: [],
    division: [],
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(filter);
  };

  const handleChange = (data, key) => {

    setFilter({...filter, type: [...data]});

    // Object.keys(filter).forEach(f => {
    //   if (f === key) {
    //     setFilter({...filter, f: new_type});
    //     console.log('filter', filter);
    //     return;
    //   }
    //   console.log('f', f);
    // });

    shrinkFilter();
  }

  const shrinkFilter = () => {
    console.log(combinations);
    Object.keys(filter).forEach(f => {
      console.log('f', f);
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <DropdownMultiselect
          name="type"
          options={types}
          handleOnChange={(data) => handleChange(data, 'type')}
        />
        <DropdownMultiselect
          name="branch"
          options={branches}
          // handleOnChange={handleChange}
          handleOnChange={(data) => handleChange(data, 'branch')}
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

