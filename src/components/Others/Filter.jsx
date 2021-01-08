import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Col, Form, Row} from "react-bootstrap";
import {branches, cities, departments, divisions, documents, employees, types} from "../../data";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const Filter = () => {

  const {register, handleSubmit} = useForm();
  const [filter, setFilter] = useState({
    type: [],
    branch: [],
    division: [],
    department: [],
    city: [],
    employee: [],
    document: [],
  })

  const onSubmit = (data) => {
    console.log(data);
    console.log(filter);
  }

  const handleChange = (data) => {
    console.log(data)
    const new_type = [...data]
    console.log(new_type)
    const new_filter = {...filter, type: new_type};
    setFilter(new_filter);
  }

  // TODO JANO implement me
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <DropdownMultiselect
          options={types}
          handleOnChange={handleChange}
          name="countries"
        />
        <DropdownMultiselect
          options={departments}
          handleOnChange={handleChange}
          name="countries"
        />
        <DropdownMultiselect
          options={divisions}
          handleOnChange={handleChange}
          name="countries"
        />
        <Form.Group as={Col} className={"align-items-end"}>
          <br/>
          <Button type="submit">Search</Button>
        </Form.Group>

      </Row>
    </Form>
  )
}

export default Filter;

