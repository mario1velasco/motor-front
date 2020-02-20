/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { Redirect, withRouter } from "react-router-dom";

// CONSTANTES
import SHARED from '@utils/global-constants';

// SERVICIOS
import { authenticationService } from '@services/authentication-service';

// COMPONENTES EXTERNOS
import { Button, Form } from 'react-bootstrap';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class UsersShow extends React.Component {
  /////////////////
  // CONSTRUCTOR //
  /////////////////
  constructor(props) {
    super(props);
    this.state = {
      apiError: null,
      currentUser: authenticationService.currentUserValue,
    };
  }

  /////////////
  // EVENTOS //
  /////////////
  onClickLogOut() {
    authenticationService.logOut()
    .then(
      response => {
        console.log(response);
        this.props.history.push(SHARED.LOGIN);
      },
      error => {
        console.log(error);
        this.setState({apiError: error.message ? error.message : error })
      }
    );
  }

  onClickEdit() {
    return (
      <Redirect to={SHARED.LOGIN}/>
    );
  }

  /////////////
  // RENDERS //
  /////////////
  render(){
    if (this.state && this.state.currentUser){
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
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Nombre de usuario" />
          </Form.Group>
          <Button variant="sucess" type="submit">
            Actualizar
          </Button>
          {this.renderSignUp()}
        </Form>
      );

    } else if(this.state) {
      return (
        <div>
          {/* <Redirect to={SHARED.LOGIN}/> */}
        </div>
      );
    }
  }
}

////////////
// EXPORT //
////////////
export default withRouter(UsersShow);