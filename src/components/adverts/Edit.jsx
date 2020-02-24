/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';
import AdvertsForm from './_Form';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class AdvertsEdit extends Common {
  /////////////
  // RENDERS //
  /////////////
  render(){
    return(
      <AdvertsForm advertId={this.props.match.params.advertId}></AdvertsForm>
    );
  }
}

////////////
// EXPORT //
////////////
export default withRouter(AdvertsEdit);