import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import './App.css';

import LoginPage from "./components/Pages/LoginPage.jsx";
import Navigation from "./components/Others/Navigation.jsx";
import MissedRecordsPage from "./components/Pages/MissedRecordsPage.jsx";
import SignedRecordsPage from "./components/Pages/SignedRecordsPage.jsx";
import SkillMatrixPage from "./components/Pages/SkillMatrixPage.jsx";
import AddRecordPage from "./components/Pages/AddRecordPage.jsx";
import FinderPage from "./components/Pages/FinderPage.jsx";
import SettingsPage from "./components/Pages/SettingsPage.jsx";
import LogoutPage from "./components/Pages/LogoutPage";
import {Container} from "react-bootstrap";

function App() {

  const NavWithRouter = withRouter(Navigation); // get page with location

  return (
    <Router>
      <>
        <NavWithRouter/>
        <Container>
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/logout' exact component={LogoutPage} />
            <Route path="/missed-docs" component={MissedRecordsPage} />
            <Route path="/signed-docs" component={SignedRecordsPage} />
            <Route path="/skill-matrix" component={SkillMatrixPage} />
            <Route path="/add-record" component={AddRecordPage} />
            <Route path="/finder" component={FinderPage} />
            <Route path="/settings" component={SettingsPage} />
          </Switch>
        </Container>
      </>
    </Router>
  );
}

export default App;
