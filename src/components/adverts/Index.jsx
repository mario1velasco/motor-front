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
import { Button, Row, Col } from 'react-bootstrap';

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
  }

  /////////////
  // RENDERS //
  /////////////
  renderNewButton(currentUser) {
    if (currentUser) {
      return (
        <Button variant="link"
          onClick={() =>this.props.history.push(`${SHARED.USERS_PATH}/${currentUser.id}/adverts/new`)}
        >
          {SHARED.BUTTONS.NEW}
        </Button>
      );
    }
  }
  render() {
    const currentUser= this.getCurrentUser();
    return (
      <div>
        {this.getAllHelpers().renderError(this.state.apiError)}
        {this.getAllHelpers().renderBackButton()}
        {this.state.adverts &&
          <div className='container'>
            <Row>
              <Col xs={9} md={9}>
                <h2>{SHARED.ADVERT_VIEWS.INDEX.TITLE}</h2>
              </Col>
              {this.renderNewButton(currentUser)}
            </Row>
            <AdvertList
              adverts={this.state.adverts}
            ></AdvertList>
          </div>
        }
      </div>
    );
  }
}

////////////
// EXPORT //
////////////
export default withRouter(AdvertsIndex);