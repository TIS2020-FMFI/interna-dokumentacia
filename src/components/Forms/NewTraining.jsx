import React, {useState} from "react";
import {useForm} from "react-hook-form";
import HookFormGroup from "./HookFormGroup";

import {Button, Row, Col, Form} from "react-bootstrap";
import {ButtonGroup} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {employees} from "../../data";

const NewTraining = ({data}) => {

  const {register, handleSubmit} = useForm();

  const [attendees, setAttendees] = useState([])

  const onSubmit = (data) => {
    console.log(data)
    console.log(attendees)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      {/* NAME */}
      <HookFormGroup
        label="Training name"
        name="name"
        placeholder="Enter document name"
        defaultValue={data.name}
        register={register}
      />

      {/* TRAINEE */}
      <HookFormGroup
        label="Name of trainee"
        name="trainee"
        placeholder="Enter document link to sharepoint"
        // defaultValue={data.trainee}
        register={register}
      />

      {/* AGENCY */}
      <HookFormGroup
        label="Name of agency"
        name="agency"
        placeholder="Enter agency"
        // defaultValue={data.agency}
        register={register}
      />

      {/* PLACE */}
      <HookFormGroup
        label="Place"
        name="place"
        placeholder="Enter place"
        // defaultValue={data.place}
        register={register}
      />

      {/* DATE */}
      <HookFormGroup
        label="Date"
        name="date"
        type="date"
        placeholder="Enter date"
        defaultValue={data.date}
        register={register}
      />

      {/* DURATION */}
      <HookFormGroup
        label="Duration"
        name="duration"
        type="number"
        placeholder="Enter duration"
        defaultValue={data.duration}
        register={register}
      />

      {/* AGENDA */}
      <HookFormGroup
        label="Agenda"
        name="agenda"
        type="textarea" // todo as?
        placeholder="Enter agenda"
        // defaultValue={data.agenda}
        register={register}
      />

      {/* LIST OF EMPLOYEES*/}
      <Form.Group as={Row}>
        <Form.Label column sm="2">Add employees</Form.Label>
        <Col>
          <Typeahead
            id="basic-typeahead-single"
            name="employees"
            labelKey="name"
            multiple
            onChange={setAttendees}
            options={employees}
            placeholder="Choose an employees..."
            selected={attendees}
          />
        </Col>
      </Form.Group>

      <ButtonGroup className="btn-language btn-group">
        <Button id="save"> Save </Button>
        <Button id="send" type="submit" variant="danger"> Send </Button>
      </ButtonGroup>

    </Form>
  )
}

export default NewTraining;
