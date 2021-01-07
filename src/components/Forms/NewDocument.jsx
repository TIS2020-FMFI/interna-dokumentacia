import {Button, Form, Row, Col} from "react-bootstrap";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {ButtonGroup} from "reactstrap";
import MyHookForm from "./MyHookForm";
import Combinations from "../Others/Combinations";

const NewDocument = ({data}) => {
  const {register, handleSubmit} = useForm();
  const [combinations, setCombinations] = useState([{
    id: 1,
    branch: "OVL",
    division: "IT",
    department: "TESTER",
    city: "Bratislava",
  }])

  const onSubmit = (data, event) => {
    // TODO saveIntoDB
    event.target.id === "save"
      ? console.log("save", data)
      : console.log("save & send", data)
  }

  return (
    <Form>

      {/* TYPE OF DOCUMENT */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">Type</Form.Label>
        <Col>
          <Form.Control as="select" defaultValue="Choose..." name="doc_type" ref={register}>
            <option>Choose...</option>
            <option>...</option>
          </Form.Control>
        </Col>
      </Form.Group>

      {/* NAME */}
      <MyHookForm
        label="Document name"
        name="name"
        placeholder="Enter document name"
        defaultValue={data.name}
        register={register}
      />

      {/* LINK */}
      <MyHookForm
        label="Link to sharepoint"
        name="link"
        placeholder="Enter document link to sharepoint"
        defaultValue={data.link}
        register={register}
      />

      {/* RELEASE */}
      <MyHookForm
        label="Release date"
        name="release"
        type="date"
        defaultValue={data.release} // todo not working
        register={register}
      />

      {/* DEADLINE */}
      <MyHookForm
        label="Deadline date"
        name="deadline"
        type="date"
        defaultValue="" // todo Date.now() + 14days
        register={register}
      />

      {/* VERSION */}
      <MyHookForm
        label="Version"
        name="version"
        placeholder="Enter version"
        defaultValue={data.version}
        register={register}
      />

      {/* ORDER NUMBER */}
      <MyHookForm
        label="Order number"
        name="number"
        type="number"
        placeholder="Enter number"
        defaultValue={data.number}
        register={register}
      />

      {/* NOTE */}
      <MyHookForm
        label="Note"
        name="note"
        type="textarea" // todo as?
        placeholder="Enter note"
        // defaultValue={data.note}
        register={register}
      />

      {/* COMBINATIONS */}
      <Combinations combinations={combinations} setCombinations={setCombinations}/>

      {/* BUTTONS */}
      <ButtonGroup className="btn-language btn-group" onClick={handleSubmit(onSubmit)}>
        <Button id="save" type="submit">
          Save
        </Button>
        <Button id="send" type="submit" variant="danger">
          Send
        </Button>
      </ButtonGroup>

    </Form>
  )
}

export default NewDocument;
