import React from 'react';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';

class Header extends React.Component {
  render() {
      return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Menéame el coche</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">About Us</Nav.Link>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/log-in">LogIn</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
  }
};

export default Header;