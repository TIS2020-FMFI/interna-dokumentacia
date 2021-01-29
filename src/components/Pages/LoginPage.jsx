import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Form, Button, ButtonGroup} from "react-bootstrap";
import {employees} from "../../data"
import {Redirect} from "react-router";
import {ErrorMessage} from "../Others/ErrorMessage";
import useSession from "../Others/useSession";

const LoginPage = () => {

  const {register, handleSubmit} = useForm();
  const [language, setLanguage] = useSession('language', "sk");
  const [user, setUser] = useSession('user', undefined);
  const [loginError, setLoginError] = useState("");

  let time = 0;
  let lastInput = '';
  let cardInput = '';

  document.addEventListener('keydown', (e) => {
    console.log(`keyPressed ${e.key}`)

    if(isCardInput()) {
      if(lastInput !== '') {
        cardInput = lastInput;
        lastInput = '';
      }
      cardInput += e.key;
      const emp = findByCard(cardInput);
      if(emp !== undefined) {
        console.log('Found Employee');
        console.log(emp);
      }
    } else {
      cardInput = '';
      lastInput = e.key;
    }

    time = Date.now();
    console.log(cardInput);

  })

  const changeLanguage = (e) => {
    sessionStorage.setItem('language', e.target.id);
    setLanguage(e.target.id);
  }

  const isCardInput = () => {
    return (Date.now() - time) < 30;
  }

  const onSubmit = (data) => {
    const employee = findMatch(data);
    if (employee !== undefined) {
      // setUser(employee); // TODO JANO
      sessionUser(employee);
    } else {
      setLoginError("Wrong pass");
    }
  }

  const sessionUser = (employee) => {
    sessionStorage.setItem('user', JSON.stringify(employee));
  }

  const findMatch = (data) => {
    // TODO MATO find employee with name and pass in db
    // TODO send feedback what is wrong: login or pass
    return employees.find((e) =>
      e.name === data.name && e.pass === data.password
    );
  }

  const findByCard = (input) => {
    // TODO MATO find employee with cardID
    return employees.find(e => e.card === input)
  }

  const active = (id) => {
    return language === id && 'active';
  }

  if (sessionStorage.getItem('user') !== null) {
    return (
      <Redirect to="/missed-docs"/>
    )
  } else
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
      { loginError && <ErrorMessage text={loginError}/> }
      <Button type="submit" variant="dark" className="btn-block">Login</Button>
    </Form>
  );
};

export default LoginPage
