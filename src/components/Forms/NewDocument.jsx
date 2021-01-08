import {Form, Row, Col} from "react-bootstrap";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import Combinations from "../Others/Combinations";
import SubmitBtns from "../Buttons/SubmitBtns";
import {types} from "../../data";

const NewDocument = ({data}) => {
  const {register, handleSubmit, errors} = useForm();

  const [combinations, setCombinations] = useState([{
    id: 1,
    branch: "OVL",
    division: "IT",
    department: "TESTER",
    city: "Bratislava",
  }]) // test combination

  return (
    <Form>

      {/* TYPE OF DOCUMENT */}
      {/* TODO JANO validate name="doc_type" */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">Type</Form.Label>
        <Col>
          <Form.Control as="select" defaultValue={-1} name="doc_type" ref={register} required>
            <option hidden disabled value={-1}>Bibi</option>
            { types.map(t => <option>{t}</option> )}
          </Form.Control>
          {errors.doc_type === "-1" && <p>Error</p>}
        </Col>
      </Form.Group>

      {/* NAME */}
      <MyHookForm
        label="Document name *" // TODO JOZO mark other required field with *
        required                // note define them as required like this example
        name="name"
        placeholder="Enter document name"
        defaultValue={data.name}
        register={register}
      />

      {/* LINK */}
      { /* TODO JOZO valid the sharepoint link */ }
      { /* TODO hint https://youtu.be/-mFXqOaqgZk?t=289 */ }
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
        defaultValue={data.release}
        register={register}
      />

      {/* DEADLINE */}
      <MyHookForm
        label="Days to deadline"
        name="deadline"
        type="number"
        defaultValue="14"
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
        as="textarea"
        placeholder="Enter note"
        defaultValue={data.note}
        register={register}
      />

      {/* COMBINATIONS */}
      <Combinations combinations={combinations} setCombinations={setCombinations}/>

      {/* SAVE | SEND BUTTONS */}
      <SubmitBtns handleSubmit={(onSubmit) => handleSubmit(onSubmit)} combinations={combinations}/>
    </Form>
  )
}

export default NewDocument;
