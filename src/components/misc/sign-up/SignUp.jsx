import React from 'react';
// import User from '../../shared/models/user';
import { userService } from '@services/user-service';
import {
  withRouter
} from "react-router-dom";
import {
  Form,
  Button,
  Nav,
  Alert
} from 'react-bootstrap';

// CONSTANTES
const HOME = '/home'
const LOGIN = '/log-in'
const EMPTY_ERROR = 'Password cannot be empty.'
const LENGTH_ERROR = 'Please enter more characters.'
const PASSWORD_ERROR = 'Passwords have to be the same'

class SignUp extends React.Component {

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      userEmail: null,
      userPassword: null,
      userConfirmationPassword: null,
      passwordError: null,
      apiError: null,
    };
  }

  // CALLBACKS
  componentDidMount() {
  }

  // METODOS DE INSTANCIA
  checkPassword() {
    const { userPassword } = this.state;
    if (!userPassword) {
      this.setState({
        passwordError: EMPTY_ERROR
      })
      return false;
    } else if (userPassword.length < 3) {
      this.setState({
        passwordError: LENGTH_ERROR
      })
      return false;
    } else if(this.state.userPassword !== this.state.userConfirmationPassword) {
      this.setState({
        passwordError: PASSWORD_ERROR
      })
      return false;
    }
    return true;
  }

  // EVENTOS
  onSubmitForm(event) {
    event.preventDefault();
    if(this.checkPassword()) {
      const data = {
        email:this.state.userEmail,
        password:this.state.userPassword,
      }
      userService.signUp(data)
      .then(
        user => {
          this.props.history.push(HOME);
        },
        error => {
          this.setState({apiError: error.message ? error.message : error })
        }
      );
    }
  }

  onChangeEmail(field) {
    this.setState({userEmail: field.target.value});
  }

  onChangePassword(field) {
    this.setState({
      userPassword: field.target.value,
      passwordError: null
    });
  }

  onChangeConfirmationPassword(field) {
    this.setState({
      userConfirmationPassword: field.target.value,
      passwordError: null
    });
  }

  // RENDER
  // Enlace para ir a signUp
  renderLogIn() {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link href={LOGIN}>
            ¿Ya tienes cuenta? <strong>Ir a inicio de sesión.</strong>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

  renderPasswordError() {
    const { passwordError } = this.state;
    if (passwordError) {
      return <div className='text-error'>{passwordError}</div>;
    }
    return null;
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

  render(){
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
          <div>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              onChange={(field) => this.onChangePassword(field)}
            />
            {this.renderPasswordError()}
          </div>
        </Form.Group>
        <Form.Group controlId="formConfirmationPassword">
          <Form.Label>Confirmar contraseña</Form.Label>
          <div>
            <Form.Control
              type="password"
              placeholder="Introduce la misma contraseña"
              onChange={(field) => this.onChangeConfirmationPassword(field)}
            />
            {this.renderPasswordError()}
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Registrarse
        </Button>
        {this.renderLogIn()}
      </Form>
    );
  }
}

export default withRouter(SignUp);