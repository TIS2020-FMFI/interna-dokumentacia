import React from "react";
import { Redirect } from "react-router";
import { removeUser } from "../utils/functions";

const LogoutPage = () => {
  removeUser();

  return <Redirect to="/login" />;
};

export default LogoutPage;
