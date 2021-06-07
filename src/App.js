import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import Navigation from "./Navigation.jsx";
import { getUser, removeUser, getFetch, redirectTo } from "./utils/functions";
import IdleTimer from "./utils/IdleTimer";

import { comboFields, TIMEOUT } from "./utils/data";

export const PairContext = createContext(undefined);

function App() {
  const [pairs, setPairs] = useState({
    branches: [],
    divisions: [],
    cities: [],
    departments: [],
  });

  /** Load all branches, divisions etc. to easily find names for their ids */
  useEffect(() => {
    const _pairs = {};
    comboFields.forEach((field) => {
      getFetch(`/${field}`).then((data) => (_pairs[field] = data));
    });
    setPairs(_pairs);
  }, []);

  /** Set timer to logout not active user after TIMEOUT expired
   *  onTimeOut the user will be logout and redirect to /login
   *  - TIMEOUT can be changed in ./utils/data */
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: TIMEOUT,
      onTimeout: () => {
        if (getUser()) {
          removeUser();
          redirectTo("/login");
        }
      },
    });
    return () => timer.cleanUp();
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <PairContext.Provider value={pairs}>
        <Routes />
      </PairContext.Provider>
    </BrowserRouter>
  );
}

export default App;
