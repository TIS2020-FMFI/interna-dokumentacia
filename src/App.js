import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
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
import {isAdmin, getUser, removeUser} from "./helpers/functions";
import Container from "react-bootstrap/Container";
import IdleTimer from "./helpers/IdleTimer";

function App() {

  const user = getUser();
  const admin = isAdmin();
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 60*10, // expire after 10 minutes
      onTimeout: () => {
        if (user !== null){
          removeUser()
          window.location.reload(false);
        }
      }
    });

    return () => {
      timer.cleanUp();
    };
  }, []);

  const Private = ({ component: Component, ...rest }) => (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route {...rest} render={props => (user !== null
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
              {/*<Private path="/skill-matrix" component={SkillMatrixPage} />*/}
                <Private path="/add-record" component={AddRecordPage} />
                {/*<Private path="/finder" component={FinderPage} />*/}
                <Private path="/settings" component={SettingsPage} />
              </>
            }
          </Switch>
        </Container>
        <div className="large-container">
        <Switch>
          {admin &&
          <>
            {/*<Private path="/skill-matrix" component={SkillMatrixPage} />*/}
            <Private path="/finder" component={FinderPage} />
          </>
          }
        </Switch>
        </div>
      </>
    </Router>
  );
}

export default App;