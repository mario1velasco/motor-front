import React from 'react';
// import User from '../../shared/models/user';
import { 
  Form, 
  Button,
  Nav
} from 'react-bootstrap';

class LogIn extends React.Component {

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      userEmail: null,
      userPassword: null,
      userCheckme: null,
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
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json()
    })
    .then((empleados) => {
      this.setState({ empleados: empleados })
    })
    .catch(console.log)
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

  render(){
    return (
      <Form
        ref={(form) => { this.form = form }}
        onSubmit={this.onSubmitForm.bind(this)}
      >
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

export default LogIn;