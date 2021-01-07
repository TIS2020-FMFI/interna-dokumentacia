import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {branches, cities, departments, divisions, documents, employees, types} from "../../data";

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
    // console.log(data, type)
    const new_type = [...filter.type, data]
    const new_filter = {...filter, type: new_type};
    setFilter(new_filter);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {/* TYPE */}
        <Form.Group as={Col}>
          <Form.Label>Type</Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            name="type"
            multiple
            labelKey="filter"
            onChange={handleChange}
            options={types}
            placeholder="Choose a type"
            selected={filter.type}
          />
        </Form.Group>

        {/* BRANCH */}
        <Form.Group as={Col}>
          <Form.Label>Branch</Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            name="branch"
            labelKey="name"
            multiple
            onChange={setFilter}

            options={branches}
            placeholder="Choose a branch"
            selected={filter.branch}
          />
        </Form.Group>

        {/* DIVISION */}
        <Form.Group as={Col}>
          <Form.Label>Division</Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            name="division"
            labelKey="name"
            multiple
            onChange={setFilter}
            options={divisions}
            placeholder="Choose a division"
            selected={filter.division}
          />
        </Form.Group>

        {/* DEPARTMENT */}
        <Form.Group as={Col}>
          <Form.Label>Department</Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            name="department"
            labelKey="name"
            multiple
            onChange={setFilter}
            options={departments}
            placeholder="Choose a department"
            selected={filter.department}
          />
        </Form.Group>

        {/* CITY */}
        <Form.Group as={Col}>
          <Form.Label>City</Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            name="city"
            labelKey="name"
            multiple
            onChange={setFilter}
            options={cities}
            placeholder="Choose a city"
            selected={filter.city}
          />
        </Form.Group>

        {/* EMPLOYEE */}
        <Form.Group as={Col}>
          <Form.Label>Search employee</Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            name="employee"
            labelKey="name"
            multiple
            onChange={setFilter}
            options={employees}
            placeholder="Search"
            selected={filter.employee}
          />
        </Form.Group>

        {/* DOCUMENT */}
        <Form.Group as={Col}>
          <Form.Label>Search document</Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            name="document"
            labelKey="name"
            multiple
            onChange={setFilter}
            options={documents}
            placeholder="Search"
            selected={filter.document}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <br/>
          <Button type="submit">Search</Button>
        </Form.Group>

      </Row>
    </Form>
  )
}

export default Filter;

