import React from "react";
import { Navbar, Nav, NavLink } from "react-bootstrap";
import { getLanguage, getUser, isAdmin } from "./utils/functions";
import { wording } from "./utils/wording";
import { useLocation } from "react-router";
import logo from "./images/logo.png"
const Navigation = () => {
  const user = getUser();
  const admin = isAdmin();

  const language = getLanguage();
  let x = language === "sk" ? wording.sk : wording.en; // TODO languages !!!
  x = x.navigation;

  const LoginNav = () => (
    <>
      <NavLink href="/records-to-sign">{x.recordsToSign}</NavLink>
      <NavLink href="/signed-records">{x.signedRecords}</NavLink>
      {admin && (
        <>
          <NavLink href="/add-record">{x.addRecord}</NavLink>
          <NavLink href="/saved-record">{x.savedRecords}</NavLink>
          <NavLink href="/finder">{x.finder}</NavLink>
          <NavLink href="/settings">{x.settings}</NavLink>
        </>
      )}
      <NavLink href="/logout">{x.logout}</NavLink>
    </>
  );

  const LogoutNav = () => <NavLink href="/login">{x.login}</NavLink>;

  const Name = () => {
    const name = user ? `${user.first_name} ${user.last_name}` : "";
    return <span style={{ color: "white" }}>{name}</span>;
  };

  return (
    <Navbar
      expand="md"
      bg="dark"
      variant="dark"
      sticky="top"
      className="navigation"
    >
      <Navbar.Brand href="/">
        <img
          alt="logo"
          src={logo}
          width="50"
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Name />
      <Navbar.Toggle />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          className="ml-auto"
          variant="pills"
          activeKey={useLocation().pathname}
        >
          {user ? <LoginNav /> : <LogoutNav />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
