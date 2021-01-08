import React, {useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import SubmitBtns from "../Buttons/SubmitBtns";
import {Row, Col, Form} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {employees} from "../../data";

const NewTraining = ({data}) => {

  const {register, handleSubmit} = useForm();
  const [attendees, setAttendees] = useState([])

  return (
    <Form>

      {/* NAME */}
      <MyHookForm
        label="Training name"
        name="name"
        placeholder="Enter document name"
        defaultValue={data.name}
        register={register}
      />

      {/* TRAINEE */}
      <MyHookForm
        label="Name of trainee"
        name="trainee"
        placeholder="Enter document link to sharepoint"
        defaultValue={data.trainee}
        register={register}
      />

      {/* AGENCY */}
      <MyHookForm
        label="Name of agency"
        name="agency"
        placeholder="Enter agency"
        defaultValue={data.agency}
        register={register}
      />

      {/* PLACE */}
      <MyHookForm
        label="Place"
        name="place"
        placeholder="Enter place"
        defaultValue={data.place}
        register={register}
      />

      {/* DATE */}
      <MyHookForm
        label="Date"
        name="date"
        type="date"
        placeholder="Enter date"
        defaultValue={data.date}
        register={register}
      />

      {/* DURATION */}
      <MyHookForm
        label="Duration"
        name="duration"
        type="number"
        placeholder="Enter duration"
        defaultValue={data.duration}
        register={register}
      />

      {/* AGENDA */}
      <MyHookForm
        label="Agenda"
        name="agenda"
        as="textarea"
        placeholder="Enter agenda"
        defaultValue={data.agenda}
        register={register}
      />

      {/* LIST OF EMPLOYEES */}
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

      {/* SAVE | SEND BUTTONS */}
      <SubmitBtns handleSubmit={(onSubmit) => handleSubmit(onSubmit)}/>
    </Form>
  )
}

export default NewTraining;
