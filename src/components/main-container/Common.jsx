/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';

// HELPERS
import { commonHelper } from '@helpers/common';

// SERVICIOS
import { authenticationService } from '@services/authentication-service';

class Common extends React.Component {
  ///////////////////////////////
  // DATOS DE LA SESION ACTUAL //
  ///////////////////////////////
  getCurrentUser() {
    return authenticationService.currentUserValue;
  }

  /////////////
  // HELPERS //
  /////////////
  getAllHelpers() {
    return commonHelper();
  }

}

////////////
// EXPORT //
////////////
export default Common;