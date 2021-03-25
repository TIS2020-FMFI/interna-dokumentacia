import React from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonGroup, Form, Container } from "react-bootstrap";
import { CustomAlert } from "../components/CustomAlert";
import { wording } from "../utils/wording";

const LoginForm = ({ onSubmit, language, setLanguage, notification }) => {
  const { register, handleSubmit } = useForm();

  const active = (id) => language === id;
  const changeLanguage = (e) => setLanguage(e.target.id);

  const { header, login, password, submit } = wording[language].loginPage;

  return (
    <Container className="login-container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* HEADER */}
        <h3 align="center">{header}</h3>
        {/* LANGUAGE BTN */}
        <ButtonGroup
          onClick={changeLanguage}
          className="container-fluid p-0 mt-4 mb-5 btn-group"
        >
          <Button id="sk" active={active("sk")}>
            Slovak
          </Button>
          <Button id="cz" active={active("cz")} disabled>
            Czech
          </Button>
          <Button id="en" active={active("en")}>
            English
          </Button>
          <Button id="hu" active={active("hu")} disabled>
            Hungary
          </Button>
        </ButtonGroup>
        {/* NAME */}
        <Form.Group>
          <Form.Label>{login}</Form.Label>
          <Form.Control
            name="email" // TODO login
            ref={register}
            required
          />
        </Form.Group>
        {/* PASS */}
        <Form.Group>
          <Form.Label>{password}</Form.Label>
          <Form.Control
            name="password"
            type="password"
            ref={register}
            required
          />
        </Form.Group>
        {/* ALERT */}
        {notification && <CustomAlert notification={notification} />}
        {/* SUBMIT BTN */}
        <Button type="submit" variant="dark" className="btn-block">
          {submit}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
