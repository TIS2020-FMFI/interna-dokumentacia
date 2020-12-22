import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import './App.css';

import Login from "./components/Forms/Login.jsx";
import Navigation from "./components/Navigation.jsx";
import MissingDocs from "./components/Lists/MissingDocs.jsx";
import SignedRecords from "./components/Lists/SignedRecords.jsx";
import SkillMatrix from "./components/SkillMatrix.jsx";
import NewRecord from "./components/NewRecord.jsx";
import Finder from "./components/Finder.jsx";
import Settings from "./components/Settings.jsx";

function App() {

  const NavWithRouter = withRouter(Navigation); // get page with it's path

  return (
    <Router>
      <>
        <NavWithRouter/>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path="/missed-docs" component={MissingDocs} />
          <Route path="/signed-docs" component={SignedRecords} />
          <Route path="/skill-matrix" component={SkillMatrix} />
          <Route path="/add-record" component={NewRecord} />
          <Route path="/finder" component={Finder} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
