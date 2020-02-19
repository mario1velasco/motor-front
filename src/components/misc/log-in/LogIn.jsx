import React from 'react';
import { authenticationService } from '@services/authentication-service';
import {
  withRouter
} from "react-router-dom";
import {
  Form,
  Button,
  Nav,
  Alert,
} from 'react-bootstrap';

// CONSTANTES
const HOME = '/home'
const SIGNUP = '/sign-up'

class LogIn extends React.Component {

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      userEmail: null,
      userPassword: null,
      apiError: null,
    };
  }

  // EVENTOS
  onSubmitForm(event) {
    event.preventDefault();
    const data = {
      email:this.state.userEmail,
      password:this.state.userPassword,
    }
    authenticationService.logIn(data)
      .then(
        user => {
          this.props.history.push(HOME);
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

  // RENDER
  // Enlace para ir a signUp
  renderSignUp() {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link href={SIGNUP}>
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

export default withRouter(LogIn);