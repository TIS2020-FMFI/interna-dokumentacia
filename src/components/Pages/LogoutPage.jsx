import React from "react";
import {Redirect} from "react-router";

const LogoutPage = () => {

  sessionStorage.removeItem('user');

  return (
    <Redirect to="/"/>
    )
};

export default LogoutPage;
