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


// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

class UsersIndex extends Common {
  /////////////
  // RENDERS //
  /////////////
  render(){
    let currentUser = this.getCurrentUser();
    if (currentUser){
      return (
        <div>
          <h2>USERS INDEX</h2>
        </div>
      );
    } else {
      return this.getAllHelpers().renderNotAuthenticated();
    }
  }
}

////////////
// EXPORT //
////////////
export default withRouter(UsersIndex);