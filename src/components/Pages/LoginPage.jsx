import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Form, Button, ButtonGroup} from "react-bootstrap";
import {employees} from "../../data"

const LoginPage = () => {

  const {register, handleSubmit} = useForm();
  const [language, setLanguage] = useState("sk");
  const [loginError, setLoginError] = useState("");

  const changeLanguage = (event) => {
    console.log(`language: ${event.target.id}`);
    setLanguage(event.target.id);
    // TODO JOZO translate and set lang cookie
  }

  const onSubmit = (data) => {
    const employee = findMatch(data);
    if (typeof employee !== 'undefined') {
      console.log('Success');
      // TODO JOZO set login cookies
    } else {
      setLoginError("Wrong pass");
      console.log('Failed');
    }
  }

  const findMatch = (data) => {
    // TODO MATO find employee with name and pass in db
    // TODO send feedback what is wrong: login or pass
    return employees.find((e) =>
      e.name === data.name && e.pass === data.password
    );
  }

  const active = (id) => {
    return language === id && 'active';
  }

  const ErrorMessage = () => {
    return (<p>{loginError}</p>)
  }

  return (
    // TODO JOZO style login form
    <Form onSubmit={handleSubmit(onSubmit)}>

      <h3 align="center">Login</h3>

      <ButtonGroup onClick={changeLanguage} className="btn-header">
        <Button id="sk" className={active("sk")}>Slovak</Button>
        <Button id="cz" className={active("cz")}>Czech</Button>
        <Button id="en" className={active("en")}>English</Button>
        <Button id="hu" className={active("hu")}>Hungary</Button>
      </ButtonGroup>

      {/* NAME */}
      <Form.Group className="form-group">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          placeholder="Enter login name"
          ref={register}
          required
        />
      </Form.Group>

      {/* NAME */}
      <Form.Group className="form-group">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter login password"
          ref={register}
          required
        />
      </Form.Group>
      { loginError && <ErrorMessage/> }
      <Button type="submit" variant="dark" className="btn-block">Login</Button>
    </Form>
  );
}

export default LoginPage
