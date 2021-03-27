import React from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonGroup, Form, Container } from "react-bootstrap";
import { CustomAlert } from "../Others/CustomAlert";
import { language} from "../../helpers/language";

const LoginForm = ({ onSubmit, languages, setLanguage, notification }) => {
  const { register, handleSubmit } = useForm();

  const active = (id) => language === id;
  const changeLanguage = (e) => setLanguage(e.target.id);

  fetch('/languages/all', {
    method: "GET",
  })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.data);
          languages.splice(0,languages.length);
          languages.push(...data.data.slice())
      })
      .catch(() => {} )
  const { header, login, password, submit } = language.loginPage;

  let buttons = []
 console.log(languages, "array before for")
  for( var i = 0,length = languages.length; i < length; i++ ) {
    let Language =  languages[ i ]
    //console.log(Language,  i)
    buttons.push(
        <Button id={Language} active={active({Language})}>
          {Language}
        </Button>
    )
  }
  active('Slovak')
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
          {buttons}
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
