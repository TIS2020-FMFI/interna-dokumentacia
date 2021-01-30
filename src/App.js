import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import {Redirect} from "react-router";

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
import {isAdmin, getUser} from "./functions";
import Container from "react-bootstrap/Container";

function App() {

  const user = getUser();
  const admin = isAdmin();

  const Private = ({ component: Component, ...rest }) => (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route {...rest} render={props => (getUser() !== null
        ? <Component {...props} />
        : <Redirect to="/" />
    )}
    />
  )

  const NavWithRouter = withRouter(Navigation); // get page with location

  return (
    <Router>
      <>
        <NavWithRouter/>
        <Container>
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/logout' exact component={LogoutPage} />
            <Private path="/missed-docs" component={MissedRecordsPage}/>
            <Private path="/signed-docs" component={SignedRecordsPage} />
            {admin &&
              <>
              <Private path="/skill-matrix" component={SkillMatrixPage} />
              <Private path="/add-record" component={AddRecordPage} />
              <Private path="/finder" component={FinderPage} />
              <Private path="/settings" component={SettingsPage} />
              </>
            }
          </Switch>
        </Container>
      </>
    </Router>
  );
}

export default App;
