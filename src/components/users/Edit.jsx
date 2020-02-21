/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';
import UsersForm from './_Form';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class UsersEdit extends Common {
  /////////////
  // RENDERS //
  /////////////
  render(){
    return(
      <UsersForm userId={this.props.match.params.id}></UsersForm>
    );
  }
}

////////////
// EXPORT //
////////////
export default withRouter(UsersEdit);