import {Form, Row, Col, Button, ButtonGroup} from "react-bootstrap";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import Combinations from "../Others/Combinations";
import {ErrorMsg} from "../Others/ErrorMsg";
import {types} from "../../data";

const DocumentForm = ({data}) => {

  const {register, handleSubmit, errors} = useForm({
    defaultValues: data // TODO JOZO release date is not fill out with defaultValues the date needs to be in _____ format
  });

  const [combinations, setCombinations] = useState([{
    id: 1,
    branch: "OVL",
    division: "IT",
    department: "TESTER",
    city: "Bratislava",
  }]) // #TEST

  const notEmpty = (val) => {
    return val !== "";
  }

  const getSelectOptions = (field) => {
    return field.map(value => <option>{value}</option>);
  }

  const onSubmit = (data, event) => {
    console.log(combinations);

    // TODO MATO save form data into DB (and SEND)
    event.target.id === "save"
      ? console.log("save", data)
      : console.log("save & send", data)
  }

  return (
    <Form>

      {/* TYPE OF DOCUMENT */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">Type *</Form.Label>
        <Col>
          <Form.Control
            as="select"
            name="doc_type"
            ref={register({validate: notEmpty})}>
            <option hidden value="">Select option ...</option>
            { getSelectOptions(types) }
          </Form.Control>
          { errors.doc_type && <ErrorMsg text={"Select a type"}/> }
        </Col>
      </Form.Group>

      {/* NAME */}
      <MyHookForm
        label="Document name *"
        name="name"
        placeholder="Enter document name"
        register={register({required:true})}
      />

      {/* LINK */}
      <MyHookForm
        label="Link to sharepoint"
        name="link"
        placeholder="Enter document link to sharepoint"
        register={register}
      />

      {/* RELEASE */}
      <MyHookForm
        label="Release date *"
        name="release"
        type="date"
        register={register({required:true})}
      />

      {/* DEADLINE */}
      <MyHookForm
        label="Days to deadline *"
        name="deadline"
        type="number"
        defaultValue="14"
        register={register({required:true})}
      />

      {/* VERSION */}
      <MyHookForm
        label="Version *"
        name="version"
        placeholder="Enter version"
        register={register({required:true})}
      />

      {/* ORDER NUMBER */}
      <MyHookForm
        label="Order number *"
        name="number"
        type="number"
        placeholder="Enter number"
        register={register({required:true})}
      />

      {/* NOTE */}
      <MyHookForm
        label="Note"
        name="note"
        as="textarea"
        placeholder="Enter note"
        register={register}
      />

      {/* COMBINATIONS */}
      <Combinations combinations={combinations} setCombinations={setCombinations}/>

      {/* SAVE | SEND BUTTONS */}
      <ButtonGroup onClick={handleSubmit(onSubmit)}>
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">Send</Button>
      </ButtonGroup>

    </Form>
  )
}

export default DocumentForm;
