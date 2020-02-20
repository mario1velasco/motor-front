/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// CONSTANTES
import SHARED from '@utils/global-constants';

// SERVICIOS
import { userService } from '@services/user-service';

// COMPONENTES EXTERNOS
import { Form, Button, Nav, Alert } from 'react-bootstrap';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class SignUp extends React.Component {
  /////////////////
  // CONSTRUCTOR //
  /////////////////
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

  //////////////////////////
  // MÉTODOS DE INSTANCIA //
  //////////////////////////
  checkPassword() {
    const { userPassword } = this.state;
    if (!userPassword) {
      this.setState({
        passwordError: SHARED.EMPTY_ERROR_FORM_VALIDATION
      })
      return false;
    } else if (userPassword.length < 3) {
      this.setState({
        passwordError: SHARED.LENGTH_ERROR_FORM_VALIDATION
      })
      return false;
    } else if(this.state.userPassword !== this.state.userConfirmationPassword) {
      this.setState({
        passwordError: SHARED.PASSWORD_ERROR_FORM_VALIDATION
      })
      return false;
    }
    return true;
  }

  /////////////
  // EVENTOS //
  /////////////
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
          this.props.history.push(SHARED.LOGIN_PATH);
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

  /////////////
  // RENDERS //
  /////////////
  renderLogIn() {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link  onClick={() =>this.props.history.push(SHARED.LOGIN_PATH)}>
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

////////////
// EXPORT //
////////////
export default withRouter(SignUp);