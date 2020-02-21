import React from 'react';
import { authenticationService } from '@services/authentication-service';
import {
  Redirect,
  withRouter
} from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap';

// CONSTANTES
const LOGIN = '/log-in'
const HOME = '/home'


class UsersIndex extends React.Component {

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      apiError: null,
      // currentUser: null,
      // currentUser: authenticationService.currentUserValue,
    };
  }

  // EVENTOS
  onClickLogOut() {
    authenticationService.logOut()
    .then(
      response => {
        console.log(response);
        this.props.history.push(LOGIN);
      },
      error => {
        console.log(error);
        this.setState({apiError: error.message ? error.message : error })
      }
    );
  }

  onClickEdit() {
    return (
      <Redirect to={LOGIN}/>
    );
  }

  render(){
    if (authenticationService.currentUserValue){
      return (
        <div>
          <h2>USERS INDEX</h2>
        </div>
      );

    } else {
      return null;
    }
  }
}

export default withRouter(UsersIndex);