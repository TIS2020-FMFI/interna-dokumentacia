import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import './App.css';

import Login from "./components/Forms/Login.jsx";
import Navigation from "./components/Others/Navigation.jsx";
import Missing from "./components/Tables/Missing.jsx";
import Signed from "./components/Tables/Signed.jsx";
import SkillMatrixPage from "./components/Pages/SkillMatrixPage.jsx";
import NewRecordPage from "./components/Pages/NewRecordPage.jsx";
import FinderPage from "./components/Pages/FinderPage.jsx";
import SettingsPage from "./components/Pages/SettingsPage.jsx";

function App() {

  const NavWithRouter = withRouter(Navigation); // get page with it's path

  return (
    <Router>
      <>
        <NavWithRouter/>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path="/missed-docs" component={Missing} />
          <Route path="/signed-docs" component={Signed} />
          <Route path="/skill-matrix" component={SkillMatrixPage} />
          <Route path="/add-record" component={NewRecordPage} />
          <Route path="/finder" component={FinderPage} />
          <Route path="/settings" component={SettingsPage} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
