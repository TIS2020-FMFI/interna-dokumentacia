import React from "react";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "../Others/ErrorMessage";
import Container from "react-bootstrap/Container";

const LoginForm = ({onSubmit, language, changeLanguage, loginError}) => {

  const {register, handleSubmit} = useForm();

  const active = (id) => {
    return language === id && 'active';
  }

  return (
    <Container style={{maxWidth: "40%", paddingTop: "6rem"}}>
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

        {/* PASS */}
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

        { loginError && <ErrorMessage text={loginError}/> }
        <Button type="submit" variant="dark" className="btn-block">Login</Button>
      </Form>
    </Container>
  )
};

export default LoginForm;