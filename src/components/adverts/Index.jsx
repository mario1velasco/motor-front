/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// CONSTANTES
import SHARED from '@utils/global-constants';

// SERVICIOS
import { advertService } from '@services/advert-service';

// COMPONENTES EXTERNOS
import { Button } from 'react-bootstrap';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';
import AdvertList from '@components/adverts/_List';

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
        {this.state.adverts &&
          <div>
            <h3>{SHARED.ADVERT_VIEWS.INDEX.TITLE}</h3>
            <AdvertList adverts={this.state.adverts} ></AdvertList>
          </div>
        }
        {currentUser &&
          <Button variant="primary"
            onClick={() =>this.props.history.push(`${SHARED.USERS_PATH}/${currentUser.id}/adverts/new`)}
          >
            {SHARED.ADVERT_VIEWS.INDEX.BUTTONS.NEW}
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