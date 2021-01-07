import React from 'react';
import {
  Navbar,
  Nav,
  NavLink,
} from 'react-bootstrap';

const Navigation = ({location}) => {

  const login = true;
  const role = "admin";

  const LoginNav = () => {
    return (
      <>
        <NavLink href="/missed-docs">Missed Records</NavLink>
        <NavLink href="/signed-docs">Signed records</NavLink>
        <NavLink href="/skill-matrix">SkillMatrix</NavLink>
        <NavLink href="/add-record">Add Record</NavLink>
        <NavLink href='/finder'>Finder</NavLink>
        <NavLink href='/settings'>Settings</NavLink>
        <NavLink href='/'>Log out</NavLink>
      </>
    )
  }

  const LogoutNav = () => {
    return (
      <NavLink href='/'>Sing in</NavLink>
    )
  }

  return (
    <>
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
          {login ? <LoginNav/> : <LogoutNav/>}
        </Nav>
      </Navbar>
    </>
  )
}

export default Navigation
