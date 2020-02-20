/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter, Router } from "react-router-dom";

// HELPERS
import { history } from '@helpers/history';

// SERVICIOS
import { authenticationService } from '@services/authentication-service';

// ESTILOS
import './App.css';

// COMPONENTES PROPIOS
import Header from '@components/misc/header/Header'
import MyRouter from '@components/misc/router/MyRouter'

class App extends React.Component {
  /////////////////
  // CONSTRUCTOR //
  /////////////////
  constructor(props) {
    super(props);
    // this.state = {
    //     currentUser: authenticationService.currentUserValue
    // };
  }

  /////////////
  // RENDERS //
  /////////////
  render() {
    return (
      <Router history={history}>
        <Header></Header>
        <div className="App">
          <MyRouter></MyRouter>
        </div>
      </Router>
    );
  }
}

////////////
// EXPORT //
////////////
export default withRouter(App);