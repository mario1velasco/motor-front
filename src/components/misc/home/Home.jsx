import React from 'react';
import { authenticationService } from '../../../shared/services/authentication-service';
import {
  Redirect,
  withRouter
} from "react-router-dom";
import {
  Button,
} from 'react-bootstrap';

class Home extends React.Component {

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      currentUser: authenticationService.currentUserValue,
      // token: authenticationService.token
    };
  }

  // CALLBACKS
  // componentDidMount() {
  //   debugger
  // }

  // EVENTOS
  onClickLogout() {
    authenticationService.logout();
    this.props.history.push("/log-in");
  }

  // RENDER
  render(){
    if (this.state && this.state.currentUser){
      return (
        <div>
          <h2>Home</h2>
          <Button variant="primary" onClick={() => this.onClickLogout()}>Log Out</Button>
        </div>
      );

    } else {
      return <Redirect to='/log-in'/>;
    }
  }
}

export default withRouter(Home);