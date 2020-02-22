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

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class AdvertsIndex extends Common {
    /////////////////
  // CONSTRUCTOR //
  /////////////////
  constructor(props) {
    super(props);
    this.state = {
      apiError: null
    };
  }

  ///////////////
  // CALLBACKS //
  ///////////////
  componentDidMount() {
    // Si es edición llamar API
    // if (this.props.advertId) {
    //   advertService.getAdvert(this.props.advertId)
    //   .then(
    //     advert => {
    //       this.setState({
    //         advert: advert
    //       })
    //     },
    //     error => {
    //       this.setState({apiError: error.message ? error.message : error })
    //     }
    //   );
    // }
  }

  /////////////
  // RENDERS //
  /////////////
  render(){
    const currentUser= this.getCurrentUser();
    return (
      <div>
        <h2>Adverts INDEX</h2>
        <h2>Adverts INDEX</h2>
        <h2>Adverts INDEX</h2>
        {currentUser &&
          <Button variant="primary"
            onClick={() =>this.props.history.push(`${SHARED.USERS_PATH}/${currentUser.id}/adverts/new`)}
          >
            Nuevo
          </Button>
        }
      </div>
    );
  }
}

////////////
// EXPORT //
////////////
export default withRouter(AdvertsIndex);