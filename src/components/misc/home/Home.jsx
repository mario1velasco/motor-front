/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// CONSTANTES
import SHARED from '@utils/global-constants';

// SERVICIOS
import { authenticationService } from '@services/authentication-service';
import { advertService } from '@services/advert-service';
import { userService } from '@services/user-service';

// COMPONENTES EXTERNOS
import { Button, Container, Row, Col } from 'react-bootstrap';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';
import AdvertList from '@components/adverts/_List';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class Home extends Common {
  /////////////////
  // CONSTRUCTOR //
  /////////////////
  constructor(props) {
    super(props);
    this.state = {
      apiError: null,
      adverts: null,
      user: null,
    };
  }

  ///////////////
  // CALLBACKS //
  ///////////////
  componentDidMount() {
    advertService.getAdverts(this.getCurrentUser().id)
    .then(
      adverts => {
        this.setState({
          adverts: adverts
        })
        userService.getUser(this.getCurrentUser().id)
        .then(
          user => {
            this.setState({
              user: user
            })
          },
          error => {
            this.setState({apiError: error.message ? error.message : error })
          }
        );
      },
      error => {
        this.setState({apiError: error.message ? error.message : error })
      }
    );
  }

  /////////////
  // EVENTOS //
  /////////////
  onClickLogOut() {
    authenticationService.logOut()
    .then(
      response => {
        this.props.history.push(SHARED.LOGIN_PATH);
      },
      error => {
        this.setState({apiError: error.message ? error.message : error })
      }
    );
  }

  /////////////
  // RENDERS //
  /////////////
  renderUserDetails() {
    if (this.state.user) {
      return (
        <Row>
          { this.state.user.username &&
            <Col xs={12} md={4}>
              <span><strong>{SHARED.USER_MODEL.FIELDS.USERNAME}:</strong> {this.state.user.username}</span>
            </Col>
          }
          { this.state.user.firstName &&
            <Col xs={12} md={4}>
              <span><strong>{SHARED.USER_MODEL.FIELDS.FIRST_NAME}:</strong> {this.state.user.firstName}</span>
            </Col>
          }
          { this.state.user.lastName &&
            <Col xs={12} md={4}>
              <span><strong>{SHARED.USER_MODEL.FIELDS.LAST_NAME}:</strong> {this.state.user.lastName}</span>
            </Col>
          }
        </Row>
      )

    }
  }
  render() {
    const currentUser = this.getCurrentUser();
    if (currentUser){
      return (
        <div>
          <div className='container'>
            {this.getAllHelpers().renderError(this.state.apiError)}
            <Row>
              <Col xs={7} md={9}>
                <h2>{SHARED.USER_VIEWS.INDEX.TITLE}</h2>
              </Col>
              <Col xs={5} md={3}>
                <Button variant="outline-danger" onClick={() => this.onClickLogOut()}>{SHARED.BUTTONS.LOG_OUT}</Button>
              </Col>
            </Row>

            {this.renderUserDetails()}
            <Row>
              <Col xs={12} md={4}>
                <span><strong>{SHARED.USER_MODEL.FIELDS.EMAIL}:</strong> {currentUser.email}</span>
              </Col>
              <Col xs={6} md={4}>
                <Button
                  variant="primary"
                  onClick={() =>this.props.history.push(`${SHARED.USERS_PATH}/${currentUser.id}/edit`)}
                >
                  {SHARED.BUTTONS.EDIT_PROFILE}
                </Button>
              </Col>

            </Row>
          </div>
          {this.state.adverts &&
            <div className='container'>
              <Row>
                <Col xs={8} md={10}>
                  <h3>{SHARED.USER_VIEWS.INDEX.ADVERTS_LIST}</h3>
                </Col>
                <Col xs={4} md={2}>
                  <Button variant="link"
                    onClick={() =>this.props.history.push(`${SHARED.USERS_PATH}/${currentUser.id}/adverts/new`)}
                  >
                    {SHARED.BUTTONS.NEW}
                  </Button>
                </Col>
              </Row>
              <AdvertList adverts={this.state.adverts} user={currentUser}></AdvertList>
            </div>
          }
        </div>
      );
    } else {
      return this.getAllHelpers().renderNotAuthenticated();
    }
  }
}

////////////
// EXPORT //
////////////
export default withRouter(Home);