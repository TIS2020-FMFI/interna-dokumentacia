import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import {Form, Row, Col, Button} from "react-bootstrap";
import Combinations from "../Tables/Combinations";
import {CustomAlert} from "../Others/CustomAlert";
import {doc_form, types as t} from "../../helpers/data";
import {
  badMsg,
  goodMsg,
  correctDocumentFormData,
  getSelectOptions,
  prefillDocumentForm,
  successResponse
} from "../../helpers/functions";

const DocumentForm = ({formData, insertRecord}) => {
  const {register, handleSubmit, errors} = useForm({
    defaultValues: prefillDocumentForm(doc_form) // TODO ME - prefill combination
    // defaultValues: prefillDocumentForm(formData)
  });

  const [types, setTypes] = useState([]);
  const [notification, setNotification] = useState();
  const [combinations, setCombinations] = useState([])
  const [emptyCombinations, setEmptyCombinations] = useState([true])
  useEffect(() => setNotification(undefined), emptyCombinations)
  useEffect(()=>{
    setTypes(t) // TODO array from DB
  },[])

  const onSubmit = (data, event) => {
    if (emptyCombinations[0] || combinations.length === 0){
      setNotification(badMsg("At least one combination is required"))
      return
    }

    data = correctDocumentFormData(data, combinations)
    console.log(data)
    const action = event.target.id
    // const result = handleDatabase('/document', data, action)

    fetch(`/document/update`, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => {
        if (successResponse(res)) {
          setNotification(goodMsg(`${action} was successful`))
          // reset({})
        } else {
          setNotification(badMsg(`${action} failed`))
        }
      })
      .catch((e) => console.log('error', e))
  }

  return (
    <Form onChange={()=>setNotification(undefined)}>
       {/* TYPE OF DOCUMENT */}
      <Form.Group as={Row}>
        <Form.Label column sm="3">Type*</Form.Label>
        <Col>
          <Form.Control as="select" name="type" ref={register({validate: v => v !== ""})}>
            {getSelectOptions(types)}
          </Form.Control>
        </Col>
      </Form.Group>
      {/* REQUIRE SUPERIOR */}
      <Form.Group as={Row}>
        <Form.Label column sm="3"> </Form.Label>
        <Col>
          <Form.Check
            inline
            label="require superior"
            name="require_superior"
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
        required={true}
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
        label="Release date*"
        name="release_date"
        type="date"
        register={register({required:true})}
      />
      {/* DEADLINE */}
      <MyHookForm
        label="Days to deadline*"
        name="deadline"
        type="date"
        defaultValue="14"
        register={register({required:true})}
      />
      {/* VERSION */}
      <MyHookForm
        label="Version*"
        name="version"
        placeholder="Enter version"
        register={register({required:true})}
      />
      {/* ORDER NUMBER */}
      <MyHookForm
        label="Order number*"
        name="order_number"
        type="number"
        placeholder="Enter number"
        register={register({required:true, valueAsNumber: true})}
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
      <Combinations
        combinations={combinations}
        setCombinations={setCombinations}
        setEmptyCombinations={setEmptyCombinations}
      />
      {/* ALERTS */}
      {notification &&
        <CustomAlert notification={notification}/>
      }
      {Object.keys(errors).length ?
        <CustomAlert text={badMsg("Fill all the require fields")}/> : null
      }
      {/* SAVE | SEND BUTTONS */}
      <div onClick={handleSubmit(onSubmit)} className="pt-1 btn-block text-right">
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">Send</Button>
      </div>
    </Form>
  )
}

export default DocumentForm;
