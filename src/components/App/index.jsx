/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { Router, Switch, Route, withRouter, Redirect } from "react-router-dom";

// CONSTANTES
import SHARED from '@utils/global-constants';

// HELPERS
import { history } from '@helpers/history';

// SERVICIOS
import { authenticationService } from '@services/authentication-service';

// ESTILOS
import './App.css';

// COMPONENTES PROPIOS
import LogIn from '@components/misc/log-in/LogIn'
import SignUp from '@components/misc/sign-up/SignUp'
import Home from '@components/misc/home/Home'
import UsersShow from '@components/users/Show'
import About from '@components/misc/about/About'
import Header from '@components/misc/header/Header'

////////////////
// CONSTANTES //
////////////////
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      authenticated
        ? <Component {...props} />
        : <Redirect to='/log-in' />
  )} />
)

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

  //////////////////////////
  // MÉTODOS DE INSTANCIA //
  //////////////////////////
  isAuthenticated() {
    const aa = authenticationService.currentUserValue
    debugger
    return authenticationService.currentUserValue ? true : false;
  }

  /////////////
  // RENDERS //
  /////////////
  render() {
    const aa = authenticationService.currentUserValue
    // AUTH
    return (
      <div>
        <Router history={history}>
          <Header></Header>
          <div className="App">
            <Switch>
              {/* If the current URL is /home, this route is rendered
                  while the rest are ignored */}
              <PrivateRoute
                path={SHARED.HOME_PATH}
                authenticated={this.isAuthenticated()}
                component={Home}
              />
              <Route path={SHARED.LOGIN_PATH} component={LogIn} />
              <Route path={SHARED.SIGNUP_PATH} component={SignUp} />
              {/* Note how these two routes are ordered. The more specific
                path="/contact/:id" comes before path="/contact" so that
                route will render when viewing an individual contact */}
              {/* <Route path="/users/:id">
                <UsersShow />
              </Route> */}

              {/* If none of the previous routes render anything,
                this route acts as a fallback.*/}
              <Route path={SHARED.ROOT_PATH} component={About} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

////////////
// EXPORT //
////////////
export default withRouter(App);