import React from 'react';
// import User from '../../shared/models/user';
// import UserService from '../../../shared/services/user-service';
import { 
  Form, 
  Button,
  Nav,
  Alert
} from 'react-bootstrap';

class SignUp extends React.Component {

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      userEmail: null,
      userPassword: null,
      userConfirmationPassword: null,
      userCheckme: null,
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
        passwordError: 'Password cannot be empty.'
      })
      return false;
    } else if (userPassword.length < 3) {
      this.setState({
        passwordError: 'Please enter more characters.'
      })
      return false;
    } else if(this.state.userPassword !== this.state.userConfirmationPassword) {
      this.setState({
        passwordError: 'Passwords have to be the same'
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
        checkme:this.state.userCheckme 
      }
      fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        response.json().then(data => {
          if (data) {
            debugger
            this.setState({apiError: data.message})
            console.log(data);
          } else {
            console.log("nO DATA");
          }
        })
      })
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

  onChangeCheckme(field) {
    this.setState({userCheckme: field.target.value});
  }

  // RENDER
  // Enlace para ir a login
  renderLogIn() {
    return (
      <Nav>
        <Nav.Item>
          <Nav.Link href="/log-in">Ir a logearse</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

  renderPasswordError() {
    const { passwordError } = this.state;
    if (passwordError) {
      return <div>{passwordError}</div>;
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
          <div>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              onChange={(field) => this.onChangePassword(field)}  
            />
            {this.renderPasswordError()}
          </div>
        </Form.Group>
        <Form.Group controlId="formConfirmationPassword">
          <Form.Label>Confirmation Password</Form.Label>
          <div>
            <Form.Control 
              type="password" 
              placeholder="ConfirmationPassword" 
              onChange={(field) => this.onChangeConfirmationPassword(field)}  
            />
            {this.renderPasswordError()}
          </div>
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
        {this.renderLogIn()}
      </Form>
    );
  }
}

export default SignUp;