/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// CONSTANTES
import SHARED from '@utils/global-constants';

// HELPERS
import { commonHelper } from '@helpers/common';

// SERVICIOS
import { authenticationService } from '@services/authentication-service';

// COMPONENTES EXTERNOS
import { Button, Form } from 'react-bootstrap';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class UsersShow extends React.Component {
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

  /////////////
  // RENDERS //
  /////////////
  render(){
    const currentUser = this.getCurrentUser();
    if (authenticationService.currentUserValue){
      return (
        <div>
          <h1>SHOW</h1>
          <span><strong>Email:</strong> {currentUser.email}</span>
          {commonHelper().renderBackButton()}
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
export default withRouter(UsersShow);