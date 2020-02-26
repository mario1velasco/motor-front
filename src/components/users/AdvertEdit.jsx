/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// COMPONENTES PROPIOS
import NestedTemplate from '@components/users/NestedTemplate';
import AdvertsForm from '@components/adverts/_Form';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class UsersAdvertEdit extends NestedTemplate {


  /////////////
  // RENDERS //
  /////////////
  render(){
    if(this.state.user) {
      return(
        <AdvertsForm
          user={this.state.user}
          advertId={this.props.match.params.advertId}
        >
        </AdvertsForm>
      );
    }
    else {
      return null;
    }
  }
}

////////////
// EXPORT //
////////////
export default withRouter(UsersAdvertEdit);