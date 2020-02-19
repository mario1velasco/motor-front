import React from 'react';
import { authenticationService } from '@services/authentication-service';
import {
  withRouter
} from "react-router-dom";
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import logo from '@public/img/mc-logo.jpg';

// CONSTANTES
const LOGIN = '/log-in'

class Header extends React.Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);

    this.state = {
        currentUser: null
    };
  }

  // CALLBACKS
  componentDidMount() {
    authenticationService.currentUser.subscribe(function(user) {
      if (user) {
        this.setState({ currentUser: user })
      }
    }.bind(this));
  }

  // MÉTODOS DE INSTANCIA
  onClickLogOut() {
    authenticationService.logOut()
    .then(
      response => {
        console.log(response);
        this.props.history.push(LOGIN);
      },
      error => {
        console.log(error);
        this.props.history.push(LOGIN);
      }
    );
  }

  // RENDERS
  render() {
    return (
      <Navbar fixed="top" bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
          Menéame el coche
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            { this.state && !this.state.currentUser &&
              <Nav.Link href="/log-in">Inicar sesión</Nav.Link>
            }
            { this.state && this.state.currentUser &&
              <Nav.Link href="/home">Inicio</Nav.Link>
            }
            { this.state && this.state.currentUser &&
              <Nav.Link onClick={() => this.onClickLogOut()}>Salir</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
};

export default withRouter(Header);