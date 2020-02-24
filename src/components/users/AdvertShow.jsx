/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// COMPONENTES PROPIOS
import NestedTemplate from '@components/users/NestedTemplate';
import AdvertsFields from '@components/adverts/_Fields';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class AdvertsShow extends NestedTemplate {


  /////////////
  // RENDERS //
  /////////////
  render(){
    if(this.state.user) {
      return(
        <AdvertsFields
          user={this.state.user}
          advertId={this.props.match.params.advertId}
        >
        </AdvertsFields>
      );
    } else {
      return null;
    }
  }
}

////////////
// EXPORT //
////////////
export default withRouter(AdvertsShow);