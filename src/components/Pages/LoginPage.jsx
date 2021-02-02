import React, {useEffect, useState} from "react";
import {employees} from "../../data"
import {Redirect} from "react-router";
import useSession from "../Others/useSession";
import {defUser, getUser, setUser} from "../../functions";
import LoginForm from "../Forms/LoginForm";
import { useHistory } from "react-router-dom";

const LoginPage = () => {

  const history = useHistory();

  const [language, setLanguage] = useSession('language', 'sk');
  const [loginError, setLoginError] = useState("");

  let time = 0;
  let lastInput = '';
  let cardInput = '';

  const event = (e) => {
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
  }

  useEffect(() => {
    document.addEventListener('keydown', event)
    return () => document.removeEventListener("keydown", event); // cleanup
  })

  const changeLanguage = (e) => {
    sessionStorage.setItem('language', e.target.id);
    setLanguage(e.target.id);
  }

  const isCardInput = () => {
    return (Date.now() - time) < 30;
  }

  const onSubmit = (data) =>{
    defUser()
    history.push("/")

    // return fetch('http://localhost:7777/login', {
    //   method:"POST"
    //   , body:new URLSearchParams(`first_name=${data.name}&password=${data.password}`)
    // })
    //   .then(response => response.json())
    //   .then(respon => {
    //     setUser({
    //       anet_id: respon.id,
    //       name: respon.first_name+" "+respon.last_name,
    //       job: respon.job_title
    //     })
    //     history.push("/")
    //   }).catch(() => setLoginError("Wrong login input"));
  }

  const findByCard = (input) => {
    // TODO MATO find employee with cardID
    return employees.find(e => e.card === input)
  }

  return (
    <>
      {getUser() !== null
        ? <Redirect to="/missed-docs"/> // FIXME don't redirect right after click on login btn
        : <LoginForm
            onSubmit={onSubmit}
            language={language}
            changeLanguage={changeLanguage}
            loginError={loginError}
          />
      }
    </>
  )
};

export default LoginPage
