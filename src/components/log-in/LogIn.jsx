import React from 'react';
import User from '../../shared/models/user';
import { 
  Form, 
  Button 
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
    // fetch('http://localhost:8000/api/')
    // // fetch('http://jsonplaceholder.typicode.com/users')
    // .then((response) => {
    //   return response.json()
    // })
    // .then((empleados) => {
    //   debugger
    //   this.setState({ empleados: empleados })
    // })
    // .catch(console.log)
  }

  // METODOS DE INSTANCIA
  parserUser() {
    let user = {
      email: this.form && this.form.elements.formEmail.value,
      password: this.form && this.form.elements.formPassword.value,
      checkme: this.form && this.form.elements.formCheckme.value,
    }
    debugger
    this.setState({
      userEmail: this.form && this.form.elements.formEmail.value,
      userPassword: this.form && this.form.elements.formPassword.value,
      userCheckme: this.form && this.form.elements.formCheckme.value,
    });
    return user;
  }

// EVENTOS
  onSubmitForm(event) {
    event.preventDefault();
    const data = { 
      email:this.state.userEmail, 
      name:this.state.userPassword, 
      checkme:this.state.userCheckme 
    }
    fetch('http://localhost:8000/session', {
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

    // const data = { 
    //   email:this.state.userEmail, 
    //   name:this.state.userPassword, 
    //   email:this.state.userCheckme 
    // }
    // fetch('http://localhost:8000/api/', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers:{ 'Content-Type': 'application/json' }
    // }).then((response) => {
    //   return response.json()
    // })
    // .then((empleados) => {
    //   this.setState({ empleados: empleados })
    // })
    // .catch(console.log)
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
      </Form>
    );
  }
}

export default LogIn;