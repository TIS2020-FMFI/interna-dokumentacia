import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import LoginForm from "./LoginForm";
import { badMsg, getUser, reloadPage } from "../utils/functions";
import { wording } from "../utils/wording";
import { proxy_url } from "../utils/data";

const LoginPage = () => {
  const [notification, setNotification] = useState();
  const [language, setLanguage] = useState("sk");

  const {
    notification: { wrongLogin, wrongCard },
  } = wording[language].loginPage;

  let cardInput = "";
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
    return e.keyCode >= aKeycode && e.keyCode <= zKeycode;
  }

  function isNumber(e) {
    let zeroKeycode = 48;
    let nineKeycode = 57;
    return e.keyCode >= zeroKeycode && e.keyCode <= nineKeycode;
  }

  function isValuable(e) {
    return isLetter(e) || isNumber(e);
  }

  function resetCardInput() {
    cardInput = "";
  }

  function checkInput() {
    if (cardInput.length === cardInputLength) {
      findByCard(cardInput);
    }
    resetCardInput();
  }

  const event = (e) => {
    let engInput = String.fromCharCode(e.keyCode).toLowerCase();
    if (isValuable(e)) {
      cardInput += engInput;
      clearTimeout(t);
      t = cardInputTimeout();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", event);
    return () => document.removeEventListener("keydown", event); // cleanup
  });

  const setUser = (data) => {
    const user = {
      id: data.id,
      role: data.role,
      first_name: data.first_name,
      last_name: data.last_name,
    };
    // console.log(data);
    sessionStorage.setItem("user", JSON.stringify(user));
    reloadPage();
  };

  const onSubmit = (data) => {
    fetch(proxy_url + "/auth/login", {
      method: "POST",
      body: new URLSearchParams(
        `login=${data.login}&password=${data.password}`
      ),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch(() => setNotification(badMsg(wrongLogin)));
  };

  const findByCard = (input) => {
    fetch(proxy_url + "/auth/kiosk", {
      method: "POST",
      body: new URLSearchParams(`card=${input}`),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch(() => setNotification(badMsg(wrongCard)));
  };

  if (getUser()) {
    return <Redirect to="/records-to-sign" />;
  }
  return (
    <LoginForm
      onSubmit={onSubmit}
      language={language}
      setLanguage={setLanguage}
      notification={notification}
    />
  );
};

export default LoginPage;
