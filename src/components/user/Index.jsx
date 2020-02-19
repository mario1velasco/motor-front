import React from 'react';
import { authenticationService } from '@services/authentication-service';
import {
  Redirect,
  withRouter
} from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap';

// CONSTANTES
const LOGIN = '/log-in'

class Index extends React.Component {

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      apiError: null,
      currentUser: null,
      currentUser: authenticationService.currentUserValue,
    };
  }

  // EVENTOS
  onClickLogOut() {
    authenticationService.logOut()
    .then(
      response => {
        console.log(response);
        this.props.history.push(LOGIN);
      },
      error => {
        console.log(error);
        this.setState({apiError: error.message ? error.message : error })
      }
    );
  }

  onClickEdit() {
    return (
      <Redirect to={LOGIN}/>
    );
  }

  render(){
    if (this.state && this.state.currentUser){
      return (
        <div>
          <h2>Mi Perfil</h2>
          <Container>
            <Row>
              <Col>
                <span><strong>Email:</strong> {this.state.currentUser.email}</span>
              </Col>
              <Col>
                <Button variant="primary" onClick={() => this.onClickEdit()}>Editar mi perfil</Button>
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

    } else if(this.state) {
      return (
        <div>
          <Redirect to={LOGIN}/>
        </div>
      );
    }
  }
}

export default withRouter(Index);