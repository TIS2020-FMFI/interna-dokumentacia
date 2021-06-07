import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import Container from "react-bootstrap/Container";
import { getUser, isAdmin } from "./utils/functions";

import RecordsToSignPage from "./unsigned-records/RecordsToSignPage";
import LoginPage from "./login/LoginPage";
import LogoutPage from "./login/LogoutPage";
import SignedRecordsPage from "./signed-records/SignedRecordsPage";
import AddRecordPage from "./add-record/AddRecordPage";
import SavedRecordsPage from "./saved-records/SavedRecordsPage";
import SettingsPage from "./settings/SettingsPage";
import FinderPage from "./finder/FinderPage";
import ReportPage from "./finder/report/ReportPage";
import Page404 from "./Page404";

const Routes = () => {
  const user = getUser();
  const admin = isAdmin();

  /** Show the component only when the user is logged in
   *  Otherwise, redirect the user to login page */
  const Private = ({ component: Component, ...rest }) => {
    if (!user) {
      return <Redirect to="/login" />;
    }
    return <Route {...rest} component={Component} />;
  };

  return (
    <>
      <Container>
        <Switch>
          {/* HomeRoute */}
          <Route
            exact
            path="/"
            render={() => {
              return getUser() ? (
                <Redirect to="/records-to-sign" component={RecordsToSignPage} />
              ) : (
                <Redirect to="/login" component={LoginPage} />
              );
            }}
          />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
          <Private path="/records-to-sign" component={RecordsToSignPage} />
          <Private path="/signed-records" component={SignedRecordsPage} />
          {admin && (
            <>
              <Private path="/add-record" component={AddRecordPage} />
              <Private path="/saved-record" component={SavedRecordsPage} />
              <Private path="/settings" component={SettingsPage} />
              <Private path="/report" component={ReportPage} />
            </>
          )}
          <Route path="*" component={Page404} />
        </Switch>
      </Container>
      <div className="large-container">
        {admin && <Private path="/finder" component={FinderPage} />}
      </div>
    </>
  );
};

export default Routes;
