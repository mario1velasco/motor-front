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
import { advertService } from '@services/advert-service';

// COMPONENTES EXTERNOS
import { Button } from 'react-bootstrap';

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
      apiError: null,
      adverts: null
    };
  }

  ///////////////
  // CALLBACKS //
  ///////////////
  componentDidMount() {
    advertService.getAdverts()
    .then(
      adverts => {
        this.setState({
          adverts: adverts
        })
      },
      error => {
        this.setState({apiError: error.message ? error.message : error })
      }
    );
    // Si es edición llamar API
    // if (this.props.advertId) {
    // }
  }

  /////////////
  // RENDERS //
  /////////////
  render(){
    const currentUser= this.getCurrentUser();
    return (
      <div>
        {this.getAllHelpers().renderError(this.state.apiError)}
        {this.getAllHelpers().renderBackButton()}
        <h2>Adverts INDEX</h2>
        {this.state.adverts &&
          this.getAllHelpers().renderAdvertsList(this.state.adverts)
        }
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