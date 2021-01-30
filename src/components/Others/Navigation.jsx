import React from 'react';
import {Navbar, Nav, NavLink} from 'react-bootstrap';
import {getUser, isAdmin} from "../../functions";

const Navigation = ({location}) => {

  const user = getUser();
  const admin = isAdmin(); // TODO session user.admin

  const LoginNav = () => {
    return (
      <>
        <NavLink href="/missed-docs">Missed Records</NavLink>
        <NavLink href="/signed-docs">Signed records</NavLink>
        {admin &&
          <>
          <NavLink href="/skill-matrix">SkillMatrix</NavLink>
          <NavLink href="/add-record">Add Record</NavLink>
          <NavLink href='/finder'>Finder</NavLink>
          <NavLink href='/settings'>Settings</NavLink>
          </>
        }
        <NavLink href='/logout'>Log out</NavLink>
      </>
    )
  };

  const LogoutNav = () => {
    return (
      <NavLink href='/'>Sing in</NavLink>
    )
  };

  return (
    <Navbar expand="sm" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt="logo"
          src="/gefco_logo.png"
          width="40"
          height="40"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Nav className="ml-auto" navbar activeKey={location.pathname}>
        { user !== null ? <LoginNav/> : <LogoutNav/> }
      </Nav>
    </Navbar>
  )
};

export default Navigation;
