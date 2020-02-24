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
    return(
      <AdvertsForm user={this.state.user}></AdvertsForm>
    );
  }
}

////////////
// EXPORT //
////////////
export default withRouter(AdvertsNew);