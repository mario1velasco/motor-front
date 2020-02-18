import React from 'react';
import { authenticationService } from '../../../shared/services/authentication-service';
import {
  withRouter
} from "react-router-dom";
import {
  Form,
  Button,
  Nav,
  Alert,
} from 'react-bootstrap';

class LogIn extends React.Component {

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      userEmail: null,
      userPassword: null,
      userCheckme: null,
      apiError: null,
    };
  }

  // CALLBACKS
  componentDidMount() {
  }

  // METODOS DE INSTANCIA

  // EVENTOS
  onSubmitForm(event) {
    event.preventDefault();
    const data = {
      email:this.state.userEmail,
      password:this.state.userPassword,
      checkme:this.state.userCheckme
    }
    authenticationService.logIn(data)
      .then(
        user => {
          this.props.history.push("/home");
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

  onChangeCheckme(field) {
    this.setState({userCheckme: field.target.value});
  }


  // RENDER
  // Enlace para ir a signUp
  renderSignUp() {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link href="/sign-up">Ir a registrarse</Nav.Link>
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

  render(){
    return (
      <Form
        ref={(form) => { this.form = form }}
        onSubmit={this.onSubmitForm.bind(this)}
      >
        {this.renderApiError()}
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(field) => this.onChangeEmail(field)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(field) => this.onChangePassword(field)}
          />
        </Form.Group>
        <Form.Group controlId="formCheckme">
          <Form.Check
            type="checkbox"
            label="Check me out"
            onChange={(field) => this.onChangeCheckme(field)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {this.renderSignUp()}
      </Form>
    );
  }
}

export default withRouter(LogIn);