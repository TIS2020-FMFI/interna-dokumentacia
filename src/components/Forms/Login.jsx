import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Form, Button, ButtonGroup} from "react-bootstrap";
import {employees} from "../../data"

const Login = () => {

  const {register, handleSubmit} = useForm();
  const [language, setLanguage] = useState("sk");

  const changeLanguage = (e) => {
    console.log(`language: ${e.target.id}`);
    setLanguage(e.target.id);
    // todo setCookies
    // todo translate
  }

  const onSubmit = (data) => {
    const employee = findMatch(data);
    if (typeof employee !== 'undefined') {
      console.log('Success');
      // todo setCookies
    } else {
      console.log('Fail');
    }
  }

  const findMatch = (data) => {
    // todo findInDB
    return employees.find(
      (e) => e.name === data.name && e.pass === data.password
    );
  }

  const isActive = (id) => {
    return language === id && 'active';
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <h3 align="center">Login</h3>

      <ButtonGroup className="btn-language" onClick={changeLanguage}>
        <Button id="sk" className={isActive("sk")}>Slovak</Button>
        <Button id="cz" className={isActive("cz")}>Czech</Button>
        <Button id="en" className={isActive("en")}>English</Button>
        <Button id="hu" className={isActive("hu")}>Hungary</Button>
      </ButtonGroup>

      {/* NAME */}
      <Form.Group className="form-group">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          placeholder="Enter login name"
          ref={register}/>
      </Form.Group>

      {/* NAME */}
      <Form.Group className="form-group">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter login password"
          ref={register}/>
      </Form.Group>

      <Button type="submit" variant="dark" className="btn-block">
        Login
      </Button>
    </Form>
  );
}

export default Login
