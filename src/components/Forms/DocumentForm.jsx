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
  successResponse, getCombinationsNames, prepareCombinations, getFormID
} from "../../helpers/functions";

const DocumentForm = ({setSavedRec, formData, actual}) => {
  // formData = doc_form
  const {register, handleSubmit} = useForm({
    defaultValues: prefillDocumentForm(formData)
  });
  const types = t;
  const [currentID, setCurrentID] = useState(getFormID(formData))
  const [notification, setNotification] = useState()
  const [combinations, setCombinations] = useState([])
  const [assignedTo, setAssignedTo] = useState([])
  const [emptyAssign, setEmptyAssign] = useState([true])
  useEffect(() => setNotification(undefined), emptyAssign)

  useEffect(() => {
    fetch('/combination', {
      method: "GET",
    })
      .then(response => response.json())
      .then(res => {
        const combs = prepareCombinations(res)
        setCombinations(combs)
        const assign = getCombinationsNames(formData, combs)
        setAssignedTo(assign)
      })
      .catch((e) => console.log(e))
  },[])

  const onSubmit = (data, event) => {
    if (assignedTo.length === 0){
      setNotification(badMsg("At least one combination is required"))
      return
    }

    data = correctDocumentFormData(data, assignedTo)
    console.log('data', data)
    const action = event.target.id

    if (action === "save")
      if (currentID) {
        data = {...data, id: currentID}
        upsert(data, 'update')
        updateSavedRec(data)
      } else {
        upsert(data, 'create')
          .then(r => setCurrentID(r.id))
      }
    if (action === "send"){
      if (currentID) {
        data = {...data, id: currentID}
        if (actual) {
          upsertConfirm(data, 'create/confirm')
            .then(r => setCurrentID(r.id))
        } else {
          upsertConfirm(data, 'update/confirm')
        }
      } else {
        upsertConfirm(data, 'create/confirm')
          .then(r => setCurrentID(r.id))
      }
      filterSavedRec(data) // TODO TEST ma to byt aj tu?
      updateSavedRec(data) // TODO TEST ma to byt aj tu?
    }
  }

  const upsert = (data, action) => {
    return fetch(`/document/${action}`, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => {
        if (successResponse(res)) {
          setNotification(goodMsg(`${action} was successful`))
        } else {
          setNotification(badMsg(`${action} failed`))
        }
        return res.json()
      })
      .catch((e) => console.log('error', e))
  }

  const upsertConfirm = (data, action) => {
    return fetch(`/document/${action}`, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => {
      if (successResponse(res)) {
        setNotification(goodMsg(`${action} was successful`))
      } else {
        setNotification(badMsg(`${action} failed`))
      }
      return res.json()
    }).catch((e) => console.log('error', e))
  }

  const filterSavedRec = (data) => {
    setSavedRec(prevState => prevState.filter(p => p.id === data.id))
  }

  const updateSavedRec = (data) => {
    setSavedRec(prevState => {
      let update = prevState
      const foundID = prevState.findIndex(p => p.id === data.id)
      update[foundID] = data
      console.log('cur', prevState)
      return update
    })
  }

  const getType = () => formData ? formData.type : ''

  return (
    <Form onChange={()=>setNotification(undefined)}>
      {/* TYPE */}
      <Form.Group as={Row}>
        <Form.Label column sm="3">Type*</Form.Label>
        <Col>
          <Form.Control
            as="select"
            name="type"
            value={getType()}
            ref={register({validate: v => v !== ""})}
          >
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
        assignedTo={assignedTo}
        setAssignedTo={setAssignedTo}
        setEmptyAssign={setEmptyAssign}
      />
      {/* ALERTS */}
      {notification &&
        <CustomAlert notification={notification}/>
      }
      {/* SAVE | SEND BUTTONS */}
      <div onClick={handleSubmit(onSubmit)} className="pt-1 btn-block text-right">
        <Button id="save" type="submit" className="mr-1">Save</Button>
        <Button id="send" type="submit" variant="danger">{actual ? 'Send as new version' : 'Send'}</Button>
      </div>
    </Form>
  )
}

export default DocumentForm;
