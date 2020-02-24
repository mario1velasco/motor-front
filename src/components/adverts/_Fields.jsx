/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// SERVICIOS
import { advertService } from '@services/advert-service';

// COMPONENTES EXTERNOS
import { Table, Nav, Button } from 'react-bootstrap';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

// CONSTANTES
import SHARED from '@utils/global-constants';


class AdvertsFields extends Common {
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
    if (this.props.advertId) {
      advertService.getAdvert(this.props.advertId)
      .then(
        advert => {
          debugger
          this.setState({
            advert: advert
          })
        },
        error => {
          this.setState({apiError: error.message ? error.message : error })
        }
      );
    }
  }

  /////////////
  // RENDERS //
  /////////////
  render() {
    return (
      <div>
        {this.getAllHelpers().renderError(this.state.apiError)}
        {this.getAllHelpers().renderBackButton()}
        <h3>FIELDS</h3>
        <h2>{this.props.user && this.props.user.email}</h2>
        { this.props.user &&
          <Button
            variant="success"
            onClick={() => this.props.history.push(`${SHARED.USERS_PATH}/${this.props.user.id}/adverts/${this.props.advertId}/edit`)}
          >
            {`${SHARED.ADVERT_MODEL.BUTTONS.EDIT}`}
          </Button>
        }
      </div>
    );

  }
}

////////////
// EXPORT //
////////////
export default withRouter(AdvertsFields);