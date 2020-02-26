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
import logo from '@public/img/mc-logo.png';

// COMPONENTES EXTERNOS
import { Navbar, Nav } from 'react-bootstrap';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class Header extends Common {
  /////////////
  // EVENTOS //
  /////////////
  onClickLogOut() {
    authenticationService.logOut()
    .then(
      response => {
        this.props.history.push(SHARED.LOGIN_PATH);
      },
      error => {
        this.props.history.push(SHARED.LOGIN_PATH);
      }
    );
  }

  /////////////
  // RENDERS //
  /////////////
  render() {
    const currentUser= this.getCurrentUser();
    return (
      <Navbar collapseOnSelect fixed="top" bg="light" expand="lg">
        <Navbar.Brand onClick={() =>this.props.history.push(SHARED.ROOT_PATH)}>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
          enéame el coche
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey="1" onClick={() =>this.props.history.push(SHARED.ADVERTS_PATH)}>
              Anuncios
            </Nav.Link>
            { !currentUser &&
              <Nav.Link eventKey="2" onClick={() =>this.props.history.push(SHARED.LOGIN_PATH)}>
                Inicar sesión
              </Nav.Link>
            }
            { currentUser &&
              <Nav.Link eventKey="3" onClick={() =>this.props.history.push(SHARED.HOME_PATH)}>
                Inicio
              </Nav.Link>
            }
            { currentUser &&
              <Nav.Link eventKey="4" onClick={() => this.onClickLogOut()}>Salir</Nav.Link>
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