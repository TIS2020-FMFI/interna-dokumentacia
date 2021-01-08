import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import './App.css';

import LoginPage from "./components/Pages/LoginPage.jsx";
import Navigation from "./components/Others/Navigation.jsx";
import MissRecordsPage from "./components/Pages/MissRecordsPage.jsx";
import Signed from "./components/Tables/Signed.jsx";
import SkillMatrixPage from "./components/Pages/SkillMatrixPage.jsx";
import AddRecordPage from "./components/Pages/AddRecordPage.jsx";
import FinderPage from "./components/Pages/FinderPage.jsx";
import SettingsPage from "./components/Pages/SettingsPage.jsx";
import {Container} from "react-bootstrap";

function App() {

  const NavWithRouter = withRouter(Navigation); // get page with it's path

  return (
    <Router>
      <>
        <NavWithRouter/>
        <Container>
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path="/missed-docs" component={MissRecordsPage} />
            <Route path="/signed-docs" component={Signed} />
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
