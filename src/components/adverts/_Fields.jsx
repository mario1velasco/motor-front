/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// SERVICIOS
import { advertService } from '@services/advert-service';
import { userService } from '@services/user-service';

// COMPONENTES EXTERNOS
import { Col, Row, Button, Alert } from 'react-bootstrap';

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
      apiError: null,
      showContactUser: null,
      contactUser: null,
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
          this.setState({
            advert: advert
          }, () => {
            if (this.getCurrentUser()) {
              userService.getUserByObjectId(advert.user)
              .then(
                contactUser => {
                  this.setState({contactUser: contactUser})
                },
                error => {
                  this.setState({apiError: error.message ? error.message : error })
                }
              );
            }

          });
        },
        error => {
          this.setState({apiError: error.message ? error.message : error })
        }
      );
    }
  }

  /////////////
  // EVENTOS //
  /////////////
  onClickDelete(advertId) {
    advertService.deleteAdvert(advertId)
    .then(
      response => {
        this.props.history.push(SHARED.HOME_PATH);
      },
      error => {
        this.setState({apiError: error.message ? error.message : error })
      }
    );
  }

  onClickShowContactUser() {
    this.setState({showContactUser: true })
  }

  /////////////
  // RENDERS //
  /////////////
  renderContactUser() {
    return (
      <Alert variant="warning" onClose={() => this.setState({showContactUser: false })} dismissible>
        <Alert.Heading>Datos de contacto</Alert.Heading>
        { this.state.contactUser &&
          <div>
            <p>{this.state.contactUser.firstName}</p>
            <p>{this.state.contactUser.telephone}</p>
          </div>
        }
      </Alert>
    );
  }

  renderAdvertDetails() {
    if (this.state.advert) {
      return (
        <Row>
          { this.state.advert.title &&
            <Col xs={12} md={12}>
              <span><strong>{SHARED.ADVERT_MODEL.FIELDS.TITLE}:</strong> {this.state.advert.title}</span>
            </Col>
          }
          { this.state.advert.description &&
            <Col xs={12} md={12}>
              <span><strong>{SHARED.ADVERT_MODEL.FIELDS.DESCRIPTION}:</strong> {this.state.advert.description}</span>
            </Col>
          }
          { this.state.advert.city &&
            <Col xs={12} md={4}>
              <span><strong>{SHARED.ADVERT_MODEL.FIELDS.CITY}:</strong> {this.state.advert.city}</span>
            </Col>
          }
          { this.state.advert.price &&
            <Col xs={12} md={4}>
              <span><strong>{SHARED.ADVERT_MODEL.FIELDS.PRICE}:</strong> {this.state.advert.price}</span>
            </Col>
          }
        </Row>
      )
    }
  }

  render() {
    const currentUser = this.getCurrentUser();
    return (
      <div>
        {this.getAllHelpers().renderError(this.state.apiError)}
        {this.getAllHelpers().renderBackButton()}
        <div className='container'>
          <Row>
            <Col xs={7} md={9}>
              <h2>{SHARED.ADVERT_VIEWS.SHOW.TITLE}</h2>
            </Col>
            { this.props.user &&
              <Col xs={5} md={3}>
                <Button variant="danger" onClick={() => this.onClickDelete(this.props.advertId)}>{SHARED.BUTTONS.DELETE}</Button>
              </Col>
            }
          </Row>
          {this.renderAdvertDetails()}
          <Row>
            { this.props.user &&
              <Col xs={2} md={2}>
                <Button
                  variant="success"
                  onClick={() => this.props.history.push(`${SHARED.USERS_PATH}/${this.props.user.id}/adverts/${this.props.advertId}/edit`)}
                >
                  {`${SHARED.BUTTONS.EDIT}`}
                </Button>
              </Col>
            }
            { currentUser && !this.props.user &&
             <Col xs={5} md={5}>
              <Button
                variant="warning"
                onClick={() => this.onClickShowContactUser()}
              >
                {`${SHARED.BUTTONS.CONTACT}`}
              </Button>
             </Col>
            }
          </Row>
        { currentUser && !this.props.user && this.state.showContactUser &&
          <Row>
            <Col>
              {this.renderContactUser()}
            </Col>
          </Row>
        }
        </div>
      </div>
    );

  }
}

////////////
// EXPORT //
////////////
export default withRouter(AdvertsFields);