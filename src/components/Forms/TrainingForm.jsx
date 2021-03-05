import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import MyHookForm from "./MyHookForm";
import {Row, Col, Form, Button} from "react-bootstrap";
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {CustomAlert} from "../Others/CustomAlert";
import {
  badMsg,
  goodMsg,
  correctTrainingFormData,
  successResponse,
  prefillTrainingForm, getEmployeesNames, getFormID
} from "../../helpers/functions";
import {trn_form} from "../../helpers/data";

const TrainingForm = ({setRecords, formData, setFormData, actual}) => {
  // formData = trn_form
  const {register, handleSubmit} = useForm({
    defaultValues: prefillTrainingForm(formData)
  });

  const [action, setAction] = useState();

  const [currentID, setCurrentID] = useState(getFormID(formData))
  const [notification, setNotification] = useState()
  const [employees, setEmployees] = useState([])
  const [attendees, setAttendees] = useState([])
  const [emptyAttendees, setEmptyAttendees] = useState([true])
  useEffect(() => setNotification(undefined), emptyAttendees)

  useEffect(() => {
    fetch('/employees/all', {
      method: "GET",
    })
      .then(response => response.json())
      .then(res => {
        setEmployees(res)
        setAttendees(getEmployeesNames(formData, res))
      })
      .catch((e) => console.log(e))
  },[])

  const onSubmit = (data) => {
    if (!attendees.length){
      setNotification(badMsg("At least one employee is required"))
      return
    }

    data = correctTrainingFormData(data, attendees)
    console.log(data)

    if (action === "save")
      if (currentID) {
        data = {...data, id: currentID}
        upsert(data, 'update')
        updateSavedRec(data)
      } else {
        upsert(data, 'create')
          .then(r => setCurrentID(r?.id))
      }
    if (action === "send"){
      if (currentID) {
        data = {...data, id: currentID}
        if (actual) {
          upsertConfirm(data, 'create/confirm')
            .then(r => setCurrentID(r?.id))
        } else {
          upsertConfirm(data, 'update/confirm')
        }
      } else {
        upsertConfirm(data, 'create/confirm')
          .then(r => setCurrentID(r?.id))
      }
    }
  }

  const upsert = (data, action) => {
    return fetch(`/training/${action}`, {
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
      }).catch((e) => console.log('error', e))
  }

  const upsertConfirm = (data, action) => {
    return fetch(`/training/${action}`, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => {
      if (successResponse(res)) {
        setNotification(goodMsg(`${action} was successful`))
        if (setRecords) filterSavedRec(data)   // update table data
        if (setFormData) setFormData(undefined) // hide modal
      } else {
        setNotification(badMsg(`${action} failed`))
      }
      return res.json()
    }).catch((e) => console.log('error', e))
  }

  const filterSavedRec = (data) => {
    setRecords(prevState => prevState.filter(p => p.id !== data.id))
  }

  const updateSavedRec = (data) => {
    setRecords(prevState => {
      let update = prevState
      const foundID = prevState.findIndex(p => p.id === data.id)
      update[foundID] = data
      return update
    })
  }

  const addAttendees = (attendee) => {
    setAttendees(attendee)
    setEmptyAttendees([false])
  }

  return (
    <Form onChange={()=>setNotification(undefined)} onSubmit={handleSubmit(onSubmit)}>
      {/* NAME */}
      <MyHookForm
        label="Training name*"
        name="name"
        placeholder="Enter document name"
        register={register}
        required
      />
      {/* TRAINEE */}
      <MyHookForm
        label="Name of lector"
        name="lector"
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
        label="Date*"
        name="date"
        type="date"
        placeholder="Enter date"
        register={register}
        required
      />
      {/* DEADLINE */}
      <MyHookForm
        label="Days to deadline*"
        name="deadline"
        type="date"
        defaultValue="14"
        register={register}
        required
      />
      {/* DURATION */}
      <MyHookForm
        label="Duration"
        name="duration"
        type="number"
        placeholder="Enter duration"
        register={register({valueAsNumber: true})}
      />
      {/* AGENDA */}
      <MyHookForm
        label="Agenda*"
        name="agenda"
        as="textarea"
        placeholder="Enter agenda"
        register={register}
        required
      />
      {/* LIST OF EMPLOYEES */}
      <Form.Group as={Row}>
        <Form.Label column sm="3">Add employees*</Form.Label>
        <Col>
          <Typeahead
            id="basic-typeahead-single"
            name="employees"
            labelKey={e => `${e.first_name} ${e.last_name} [${e.id}]`}
            multiple
            onChange={addAttendees}
            options={employees}
            placeholder="Choose an employees..."
            selected={attendees}
          />
        </Col>
      </Form.Group>
      {/* ALERTS */}
      {notification && <CustomAlert notification={notification}/> }
      {/* SAVE | SEND BUTTONS */}
      <div className="pt-1 btn-block text-right">
        <Button type="submit" className="mr-1" onClick={()=>setAction('save')}>
          Save
        </Button>
        <Button type="submit" variant="danger" onClick={()=>setAction('send')}>
          Send
        </Button>
      </div>
    </Form>
  )
}

export default TrainingForm;
