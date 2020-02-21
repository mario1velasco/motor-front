/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// SERVICIOS
import { authenticationService } from '@services/authentication-service';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

class UsersForm extends Common {
  ///////////////
  // CALLBACKS //
  ///////////////
  componentDidMount() {
    // Si es edición llamar API
    if (this.props.userId) {

    }
  }

  /////////////
  // RENDERS //
  /////////////
  render(){
    let currentUser = this.getCurrentUser();
    if (currentUser){
      return (
        <div>
          <h1>USER FORM</h1>
          <span><strong>Email:</strong> {currentUser.email}</span>
          {this.getAllHelpers().renderBackButton()}
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
export default withRouter(UsersForm);