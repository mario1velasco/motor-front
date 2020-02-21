/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { Redirect, withRouter } from "react-router-dom";

// CONSTANTES
import SHARED from '@utils/global-constants';

// SERVICIOS
import { authenticationService } from '@services/authentication-service';

// COMPONENTES EXTERNOS
import { Button, Container, Row, Col } from 'react-bootstrap';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class Home extends React.Component {
  /////////////////
  // CONSTRUCTOR //
  /////////////////
  constructor(props) {
    super(props);
    this.state = {
      apiError: null,
      // currentUser: authenticationService.currentUserValue,
      // currentUser: null,
    };
  }

  // CALLBACKS
  // componentDidMount() {
  //   authenticationService.currentUser.subscribe(function(user) {
  //     if (user) {
  //       this.setState({ currentUser: user })
  //     }
  //   }.bind(this));
  // }

  /////////////
  // EVENTOS //
  /////////////
  onClickLogOut() {
    authenticationService.logOut()
    .then(
      response => {
        console.log(response);
        this.props.history.push(SHARED.LOGIN_PATH);
      },
      error => {
        console.log(error);
        this.setState({apiError: error.message ? error.message : error })
      }
    );
  }

  onClickEdit() {
    return (
      <Redirect to=
          {{
          pathname: '/users',
          state: { id: '123' }
        }}
      />
    );
  }

  /////////////
  // RENDERS //
  /////////////
  render() {
    const currentUser = authenticationService.currentUserValue;
    // debugger
    // HOME
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
                <Button variant="primary" onClick={() =>this.props.history.push(`${SHARED.USERS_PATH}/${currentUser.id}`)}>Editar mi perfil</Button>
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

    } else if(!currentUser) {
      return null;
    }
  }
}

////////////
// EXPORT //
////////////
export default withRouter(Home);