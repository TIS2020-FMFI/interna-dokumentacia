import {Form, Row, Col, Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import Combinations from "../Others/Combinations";
import {ErrorMessage} from "../Others/ErrorMessage";
import {proxy, types} from "../../data";
import {getSelectOptions} from "../../functions";

const DocumentForm = ({form_data}) => {

  const {register, handleSubmit, errors} = useForm({
    defaultValues: {...form_data, deadline: 14}
  });

  const [combinations, setCombinations] = useState([])

  const [error, setError] = useState(null)
  useEffect(() => setError(""), combinations)

  const onSubmit = (data, event) => {
    if (combinations.length === 0){
      setError("At least one combination is required")
      return
    }

    data = {...data, combinations: combinations}
    console.log('combinations', combinations);
    console.log('data', data)

    const doc_id = insertDocument(data)
    if (event.target.id === "send"){
      sendDocument(doc_id)
    }
  }

  const insertDocument = (data) => {
    return fetch(`${proxy}/document/create`, {
      method: "POST",
      body: new URLSearchParams(`document=${data}`)
    })
      .then(response => response.json())
      .then(respon => {
        console.log(respon)
        return null; // id
      })
      .catch((e) => console.log(e))
  }

  const sendDocument = (id) => {
    return fetch(`${proxy}/document/confirm`, {
      method: "POST",
      body: new URLSearchParams(`document=${id}`)
    })
      .then(response => response.json())
      .then(respon => {
        console.log(respon)
        return null;
      })
      .catch((e) => console.log(e))
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
            ref={register({validate: v => v !== ""})}
            // ref={register}
          >
            {getSelectOptions(types)}
          </Form.Control>
          { errors.doc_type && <ErrorMessage text={"Select a type"}/> }
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
        ref={register({required:true})}
        // required={true}
        // ref={register}
      />
      { errors.name && <ErrorMessage/> }

      {/* LINK */}
      <MyHookForm
        label="Link to sharepoint"
        name="link"
        placeholder="Enter document link to sharepoint"
        ref={register}
      />

      {/* RELEASE */}
      <MyHookForm
        label="Release date*"
        name="release_date"
        type="date"
        // ref={register({required:true})}
        ref={register}
      />
      { errors.date && <ErrorMessage/> }

      {/* DEADLINE */}
      <MyHookForm
        label="Days to deadline*"
        name="deadline"
        type="number"
        defaultValue="14"
        // ref={register({required:true})}
        ref={register}
      />
      { errors.number && <ErrorMessage/> }

      {/* VERSION */}
      <MyHookForm
        label="Version*"
        name="version"
        placeholder="Enter version"
        // ref={register({required:true})}
        ref={register}
      />
      { errors.version && <ErrorMessage/> }

      {/* ORDER NUMBER */}
      <MyHookForm
        label="Order number*"
        name="order_number"
        type="number"
        placeholder="Enter number"
        // register={register({required:true})}
        register={register}
      />
      { errors.number && <ErrorMessage/> }

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
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">Send</Button>
      </div>

    </Form>
  )
}

export default DocumentForm;
