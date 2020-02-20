/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// CONSTANTES
import SHARED from '@utils/global-constants';

// SERVICIOS
import { authenticationService } from '@services/authentication-service';

// PUBLICO
import logo from '@public/img/mc-logo.jpg';

// COMPONENTES EXTERNOS
import { Navbar, Nav } from 'react-bootstrap';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class Header extends React.Component {
  /////////////////
  // CONSTRUCTOR //
  /////////////////
  constructor(props) {
    super(props);

    // this.state = {
    //     currentUser: null
    // };
  }

  ///////////////
  // CALLBACKS //
  ///////////////
  // componentDidMount() {
  //   authenticationService.currentUser.subscribe(function(user) {
  //     if (user) {
  //       this.setState({ currentUser: user })
  //     }
  //   }.bind(this));
  // }

  //////////////////////////
  // MÉTODOS DE INSTANCIA //
  //////////////////////////
  onClickLogOut() {
    authenticationService.logOut()
    .then(
      response => {
        console.log(response);
        this.props.history.push(SHARED.LOGIN_PATH);
      },
      error => {
        console.log(error);
        this.props.history.push(SHARED.LOGIN_PATH);
      }
    );
  }

  /////////////
  // RENDERS //
  /////////////
  render() {
    const currentUser= authenticationService.currentUserValue
    // debugger
    // HEADER
    return (
      <Navbar fixed="top" bg="light" expand="lg">
        <Navbar.Brand onClick={() =>this.props.history.push(SHARED.ROOT_PATH)}>
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
            { !currentUser &&
              <Nav.Link onClick={() =>this.props.history.push(SHARED.LOGIN_PATH)}>
                Inicar sesión
              </Nav.Link>
            }
            { currentUser &&
              <Nav.Link onClick={() =>this.props.history.push(SHARED.HOME_PATH)}>
                Inicio
              </Nav.Link>
            }
            { currentUser &&
              <Nav.Link onClick={() => this.onClickLogOut()}>Salir</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
};

////////////
// EXPORT //
////////////
export default withRouter(Header);