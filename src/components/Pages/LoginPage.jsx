import React, {useEffect, useState} from "react";
import {Redirect} from "react-router";
import useSessionStorage from "@rooks/use-sessionstorage";
import LoginForm from "../Forms/LoginForm";
import { useHistory } from "react-router-dom";
import {proxy} from "../../data";

const LoginPage = () => {

  const history = useHistory();

  const [language, setLanguage] = useSessionStorage("language", "sk");
  const [user, setUser] = useSessionStorage("user", undefined);
  const [loginError, setLoginError] = useState("");

  let time = 0;
  let lastInput = '';
  let cardInput = '';
  const isCardInput = () => Date.now() - time < 30

  const event = (e) => {
    console.log(`keyPressed ${e.key}`)

    if(isCardInput()) {
      if(lastInput !== '') {
        cardInput = lastInput;
        lastInput = '';
      }
      cardInput += e.key;
      findByCard(cardInput);
      if(user !== undefined) {
        console.log('Found Employee', user);
      }
    } else {
      cardInput = '';
      lastInput = e.key;
    }

    time = Date.now();
    console.log('cardInput', cardInput);
  }

  useEffect(() => {
    document.addEventListener('keydown', event)
    return () => document.removeEventListener("keydown", event); // cleanup
  })

  const onSubmit = (data) =>{
    fetchLoginByPass(data)
  }

  const findByCard = (input) => {
    // TODO MATO find employee with cardID
    fetchLoginByCard(input)
  }

  const fetchLoginByPass = (data) => {
    fetch(`${proxy}/login`, {
      method: "POST",
      body: new URLSearchParams(`login=${data.login}&password=${data.password}`)
    })
      .then(response => response.json())
      .then(res => {
        setUser({id: res.id, role: res.role})
        history.push("/")
      })
      .catch(() => setLoginError("Wrong login input"))
  }

  const fetchLoginByCard = (input) => {
    fetch(`${proxy}/kiosk`, {
      method: "POST",
      body: new URLSearchParams(`card=${input}`)
    })
      .then(response => response.json())
      .then(res => {
        setUser({id: res.id, role: res.role})
        history.push("/")
      })
      .catch(() => setLoginError("Wrong card input"))
  }

  return (
    <>
      {user !== null
        ? <Redirect to="/missed-docs"/>
        : <LoginForm
            onSubmit={onSubmit}
            language={language}
            setLanguage={setLanguage}
            loginError={loginError}
          />
      }
    </>
  )
};

export default LoginPage
