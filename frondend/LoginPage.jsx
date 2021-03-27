import React, {useEffect, useState} from "react";
import {Redirect} from "react-router";
import LoginForm from "../Forms/LoginForm";
import {badMsg, getUser, reloadPage} from "../../helpers/functions";
import {language, allLanguages, setGlobalLanguage} from "../../helpers/language";

const LoginPage = () => {
  console.log(JSON.stringify(language))
  const [notification, setNotification] = useState()
  const setLanguage = (switchLanguage) => {
    fetch('/language/'+switchLanguage, {
      method: "GET",
    })
        .then(response => response.json())
        .then(data => {
          const lang=JSON.parse(data.data);
          console.log(lang)
          setGlobalLanguage(lang)
          console.log(language)})
        .catch(() => setNotification(badMsg("wrong data")))
  }
  fetch('/languages/all', {
    method: "GET",
  })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.data);
      allLanguages.splice(0,allLanguages.length);
      allLanguages.push(...data.data.slice())
      })
      .catch(() => {
        setNotification(badMsg(wrongLogin));
        allLanguages.splice(0,allLanguages.length)
        allLanguages.push('Slovak')
      })
  const {
    notification: {
      wrongLogin,
      wrongCard,
    }
  } = language.loginPage

  let cardInput = '';
  const maxCardInputTimeDifference = 40;
  const cardInputLength = 10;
  let t = cardInputTimeout();
  clearTimeout(t);

  function cardInputTimeout() {
    return setTimeout(checkInput, maxCardInputTimeDifference);
  }

  function isLetter(e) {
    let aKeycode = 65;
    let zKeycode = 90;
    return e.keyCode >= aKeycode && e.keyCode <= zKeycode
  }

  function isNumber(e) {
    let zeroKeycode = 48;
    let nineKeycode = 57;
    return e.keyCode >= zeroKeycode && e.keyCode <= nineKeycode
  }

  function isValuable(e) {
    return isLetter(e) || isNumber(e)
  }

  function resetCardInput() {
    cardInput = '';
  }

  function checkInput() {
    if(cardInput.length === cardInputLength) {
      findByCard(cardInput);
    }
    resetCardInput();
  }

  const event = (e) => {
    let engInput = String.fromCharCode(e.keyCode).toLowerCase()
    if(isValuable(e)) {
      cardInput += engInput;
      clearTimeout(t);
      t = cardInputTimeout();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', event)
    return () => document.removeEventListener("keydown", event); // cleanup
  })

  const setUser = (data) => {
    const user = {
      id: data.id,
      role: data.role
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    reloadPage()
  }

  const onSubmit = (data) => {
    fetch('/auth/login', {
      method: "POST",
      body: new URLSearchParams(`login=${data.email}&password=${data.password}`)
    })
      .then(response => response.json())
      .then(data => { setUser(data) })
      .catch(() => setNotification(badMsg(wrongLogin)))
  }

  const findByCard = (input) => {
    fetch('/auth/kiosk', {
      method: "POST",
      body: new URLSearchParams(`card=${input}`)
    })
      .then(response => response.json())
      .then(data => { setUser(data) })
      .catch(() => setNotification(badMsg(wrongCard)))
  }

  if (getUser()) {
    return <Redirect to="/records-to-sign" />
  }
  return (
    <LoginForm
      onSubmit={onSubmit}
      languages={allLanguages}
      setLanguage={setLanguage}
      notification={notification}
    />
  )
};

export default LoginPage
