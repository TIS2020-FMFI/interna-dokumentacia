import React, {useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import {Row, Col, Form, Button, ButtonGroup} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {employees} from "../../data";

const TrainingForm = ({data}) => {

  const {register, handleSubmit} = useForm({
    defaultValues: data
  });
  const [attendees, setAttendees] = useState([])

  const onSubmit = (data, event) => {
    event.target.id === "save"
      ? console.log("save", data)
      : console.log("save & send", data)
  }

  return (
    <Form>

      {/* NAME */}
      <MyHookForm
        label="Training name *"
        name="name"
        placeholder="Enter document name"
        register={register({required:true})}
      />

      {/* TRAINEE */}
      <MyHookForm
        label="Name of trainee"
        name="trainee"
        placeholder="Enter document link to sharepoint"
        register={register}
      />

      {/* AGENCY */}
      <MyHookForm
        label="Name of agency"
        name="agency"
        placeholder="Enter agency"
        register={register}
      />

      {/* PLACE */}
      <MyHookForm
        label="Place"
        name="place"
        placeholder="Enter place"
        register={register}
      />

      {/* DATE */}
      <MyHookForm
        label="Date *"
        name="date"
        type="date"
        placeholder="Enter date"
        register={register({required:true})}
      />

      {/* DURATION */}
      <MyHookForm
        label="Duration"
        name="duration"
        type="number"
        placeholder="Enter duration"
        register={register}
      />

      {/* AGENDA */}
      <MyHookForm
        label="Agenda *"
        name="agenda"
        as="textarea"
        placeholder="Enter agenda"
        register={register({required:true})}
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
      <ButtonGroup onClick={handleSubmit(onSubmit)}>
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">Send</Button>
      </ButtonGroup>
    </Form>
  )
}

export default TrainingForm;
