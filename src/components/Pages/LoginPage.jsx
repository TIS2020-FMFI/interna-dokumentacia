import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {employees} from "../../data"
import {Redirect} from "react-router";
import useSession from "../Others/useSession";
import {getUser, setUser} from "../../functions";
import LoginForm from "../Forms/LoginForm";

const LoginPage = () => {

  const [language, setLanguage] = useSession('language', "sk");
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
      setUser(employee);
    } else {
      setLoginError("Wrong login input");
    }
  }

  const findMatch = (data) =>{
    return fetch('http://localhost:7777/login', {
      method:"POST",
      body:new URLSearchParams(name_e+"="+data.name+"&"+password+"="+data.password )
    })
      .then(response => response.json())
      .then(res => {
        return {
          anet_id: res.Id,
          full_name: res.first_name+" "+res.last_name,
          job: res.job_title
        };
      }).catch(e =>console.log(e));
  }

  // const findMatch = (data) => {
  //   return employees.find((e) =>
  //     e.name === data.name && e.pass === data.password
  //   );
  // }

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
