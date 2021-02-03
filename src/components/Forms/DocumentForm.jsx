import {Form, Row, Col, Button, ButtonGroup, Container, Alert} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import Combinations from "../Others/Combinations";
import {ErrorMessage} from "../Others/ErrorMessage";
import {types} from "../../data";
import {getSelectOptions} from "../../functions";

const DocumentForm = ({data}) => {

  data = {...data, deadline: 14}

  const {register, handleSubmit, errors} = useForm({
    defaultValues: data
  });

  const [combinations, setCombinations] = useState([{
    id: 1,
    branch: "OVL",
    division: "IT",
    department: "TESTER",
    city: "Bratislava",
  }]) // #TEST

  const notEmpty = (val) => { return val !== "" }
  const [error, setError] = useState(null)
  useEffect(() => setError(""), combinations)

  const onSubmit = (data, event) => {
    console.log(combinations);
    if (combinations.length === 0){
      setError("At least one combination is required")
      return
    }
    // TODO MATO save document's data into DB (and SEND) with combination
    event.target.id === "save"
      ? console.log("save", data)
      : console.log("save & send", data)
  }

  return (
    <Form>

      {/* TYPE OF DOCUMENT */}
      <Form.Group as={Row}>
        <Form.Label column sm="2">Type*</Form.Label>
        <Col>
          <Form.Control
            as="select"
            name="type"
            ref={register({validate: notEmpty})}
          >
            <option hidden value="">Select option ...</option>
            {getSelectOptions(types)}
          </Form.Control>
          {/*{ errors.doc_type && <ErrorMessage text={"Select a type"}/> }*/}
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">Require superior</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            id="yes"
            label="yes"
            value={true}
            inline
            name="require_superior"
            ref={register}
          />
          <Form.Check
            type="radio"
            id="no"
            label="no"
            value={false}
            name="require_superior"
            inline
            defaultChecked
            ref={register}
          />
        </Col>
      </Form.Group>

      {/* NAME */}
      <MyHookForm
        label="Document name*"
        name="name"
        placeholder="Enter document name"
        register={register({required:true})}
      />
      {/*{ errors.name && <ErrorMessage/> }*/}

      {/* LINK */}
      <MyHookForm
        label="Link to sharepoint"
        name="link"
        placeholder="Enter document link to sharepoint"
        register={register}
      />

      {/* RELEASE */}
      <MyHookForm
        label="Release date*"
        name="release_date"
        type="date"
        register={register({required:true})}
      />
      {/*{ errors.date && <ErrorMessage/> }*/}

      {/* DEADLINE */}
      <MyHookForm
        label="Days to deadline*"
        name="deadline"
        type="number"
        defaultValue="14"
        register={register({required:true})}
      />
      {/*{ errors.number && <ErrorMessage/> }*/}

      {/* VERSION */}
      <MyHookForm
        label="Version*"
        name="version"
        placeholder="Enter version"
        register={register({required:true})}
      />
      {/*{ errors.version && <ErrorMessage/> }*/}

      {/* ORDER NUMBER */}
      <MyHookForm
        label="Order number*"
        name="order_number"
        type="number"
        placeholder="Enter number"
        register={register({required:true})}
      />
      {/*{ errors.number && <ErrorMessage/> }*/}

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
      { error && <ErrorMessage text={error}/> }

      {/* SAVE | SEND BUTTONS */}
      <div onClick={handleSubmit(onSubmit)} className="pt-1 btn-block text-right">
        <Button id="save" type="submit" variant="dark" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">Send</Button>
      </div>

    </Form>
  )
}

export default DocumentForm;
