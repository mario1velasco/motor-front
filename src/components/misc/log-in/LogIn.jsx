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

// COMPONENTES EXTERNOS
import { Form, Button, Nav, Alert } from 'react-bootstrap';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class LogIn extends Common {
  /////////////////
  // CONSTRUCTOR //
  /////////////////
  constructor(props) {
    super(props);
    this.state = {
      userEmail: null,
      userPassword: null,
      apiError: null,
    };
  }

  /////////////
  // EVENTOS //
  /////////////
  onSubmitForm(event) {
    event.preventDefault();
    const data = {
      email:this.state.userEmail,
      password:this.state.userPassword,
    }
    authenticationService.logIn(data)
      .then(
        user => {
          this.props.history.push(SHARED.HOME_PATH);
        },
        error => {
          this.setState({apiError: error.message ? error.message : error })
        }
      );
  }

  onChangeEmail(field) {
    this.setState({userEmail: field.target.value});
  }

  onChangePassword(field) {
    this.setState({userPassword: field.target.value});
  }

  /////////////
  // RENDERS //
  /////////////
  renderSignUp() {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link onClick={() =>this.props.history.push(SHARED.SIGNUP_PATH)}>
            ¿Nuevo usuario? <strong>Ir a registrarse.</strong>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

  renderApiError() {
    if (this.state.apiError) {
      return (
        <Alert key="alert" variant='danger'>
          {this.state.apiError}
        </Alert>
      );
    }
  }

  render() {
    return (
      <Form
        ref={(form) => { this.form = form }}
        onSubmit={this.onSubmitForm.bind(this)}
      >
        {this.renderApiError()}
        <Form.Group controlId="formEmail">
          <Form.Label>Dirección email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduzca email"
            onChange={(field) => this.onChangeEmail(field)}
          />
          <Form.Text className="text-muted">
            Nunca compartimos tu email con nadie.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introduzca contraseña"
            onChange={(field) => this.onChangePassword(field)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
        {this.renderSignUp()}
      </Form>
    );
  }
}

////////////
// EXPORT //
////////////
export default withRouter(LogIn);