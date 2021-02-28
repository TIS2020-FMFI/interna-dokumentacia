import React from "react";
import {useForm} from "react-hook-form";
import {Button, ButtonGroup, Form, Container} from "react-bootstrap";
import {CustomAlert} from "../Others/CustomAlert";

const LoginForm = ({onSubmit, language, setLanguage, notification}) => {

  const {register, handleSubmit} = useForm();

  const active = id => language === id && 'active'
  const changeLanguage = e => setLanguage(e.target.id)

  return (
    <Container className="login-container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* HEADER */}
        <h3 align="center">Login</h3>
        {/* LANGUAGE BTN */}
        <ButtonGroup onClick={changeLanguage} className="container-fluid p-0 mt-3 mb-3 btn-group">
          <Button id="sk" className={active("sk")}>Slovak</Button>
          <Button id="cz" className={active("cz")}>Czech</Button>
          <Button id="en" className={active("en")}>English</Button>
          <Button id="hu" className={active("hu")}>Hungary</Button>
        </ButtonGroup>
        {/* NAME */}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            placeholder="Enter email"
            ref={register}
            required
          />
        </Form.Group>
        {/* PASS */}
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter password"
            ref={register}
            required
          />
        </Form.Group>
        {/* ALERT */}
        {notification && <CustomAlert notification={notification}/>}
        {/* SUBMIT BTN */}
        <Button type="submit" variant="dark" className="btn-block">Login</Button>
      </Form>
    </Container>
  )
};

export default LoginForm;