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
            <Col>
              <span><strong>{SHARED.USER_MODEL.FIELDS.USERNAME}:</strong> {this.state.user.username}</span>
            </Col>
          }
          { this.state.user.firstName &&
            <Col>
              <span><strong>{SHARED.USER_MODEL.FIELDS.FIRST_NAME}:</strong> {this.state.user.firstName}</span>
            </Col>
          }
          { this.state.user.lastName &&
            <Col>
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
          {this.getAllHelpers().renderError(this.state.apiError)}
          <h2>{SHARED.USER_VIEWS.INDEX.TITLE}</h2>
          <Container>
            {this.renderUserDetails()}
            <Row>
              <Col>
                <span><strong>{SHARED.USER_MODEL.FIELDS.EMAIL}:</strong> {currentUser.email}</span>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  onClick={() =>this.props.history.push(`${SHARED.USERS_PATH}/${currentUser.id}/edit`)}
                >
                  {SHARED.USER_VIEWS.INDEX.BUTTONS.EDIT_PROFILE}
                </Button>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => this.onClickLogOut()}>{SHARED.USER_VIEWS.INDEX.BUTTONS.LOG_OUT}</Button>
              </Col>
            </Row>
          </Container>
          {this.state.adverts &&
            <div>
              <h3>{SHARED.USER_VIEWS.INDEX.ADVERTS_LIST}</h3>
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