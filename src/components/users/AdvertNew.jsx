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
class AdvertsNew extends NestedTemplate {


  /////////////
  // RENDERS //
  /////////////
  render(){
    if(this.state.user) {
      return(
        <AdvertsForm user={this.state.user}></AdvertsForm>
      );
    } else {
      return null;
    }
  }
}

////////////
// EXPORT //
////////////
export default withRouter(AdvertsNew);