// TODO JOZO style login form
import {Button, ButtonGroup, Form} from "react-bootstrap";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "../Others/ErrorMessage";

const LoginForm = ({onSubmit, changeLanguage}) => {

  const {register, handleSubmit} = useForm();
  const [language, setLanguage] = useState("sk");
  const [loginError, setLoginError] = useState("");

  const active = (id) => {
    return language === id && 'active';
  }

  return (
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
      { loginError && <ErrorMessage text={"Wrong email or password"}/> }
      <Button type="submit" variant="dark" className="btn-block">Login</Button>
    </Form>
  )
};

export default LoginForm;