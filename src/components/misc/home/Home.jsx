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

// COMPONENTES EXTERNOS
import { Button, Container, Row, Col } from 'react-bootstrap';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class Home extends Common {
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
  render() {
    const currentUser = this.getCurrentUser();
    if (currentUser){
      return (
        <div>
          <h2>Mi Perfil</h2>
          <Container>
            <Row>
              <Col>
                <span><strong>Email:</strong> {currentUser.email}</span>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  onClick={() =>this.props.history.push(`${SHARED.USERS_PATH}/${currentUser.id}/edit`)}
                >
                  Editar mi perfil
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>1 of 3</Col>
              <Col>2 of 3</Col>
              <Col>3 of 3</Col>
            </Row>
            <Row>
              <Col>1 of 3</Col>
              <Col>
                <Button variant="primary" onClick={() => this.onClickLogOut()}>Log Out</Button>
              </Col>
              <Col>3 of 3</Col>
            </Row>
          </Container>
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