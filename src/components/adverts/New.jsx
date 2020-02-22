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
class AdvertsNew extends Common {
  /////////////
  // RENDERS //
  /////////////
  render(){
    return(
      <AdvertsForm></AdvertsForm>
    );
  }
}

////////////
// EXPORT //
////////////
export default withRouter(AdvertsNew);