import React from 'react';
import './App.css';
import LogIn from '@components/misc/log-in/LogIn'
import SignUp from '@components/misc/sign-up/SignUp'
import Home from '@components/misc/home/Home'
// import UserShow from '@components/user/Index'
import About from '@components/misc/about/About'
import Header from '@components/misc/header/Header'
import { authenticationService } from '@services/authentication-service';
import { history } from '@helpers/history';
import {
  Router,
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";

// CONSTANTES
const HOME_PATH = '/home'
const LOGIN_PATH = '/log-in'
const SIGNUP_PATH = '/sign-up'
const ROOT_PATH = '/'
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
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
        currentUser: authenticationService.currentUserValue
    };
  }

  // METODOS DE INSTANCIA
  isAuthenticated() {
    return this.state.currentUser ? true : false;
  }

  // RENDERS
  render() {
    return (
      <div>
        <Router history={history}>
          <Header></Header>
          <div className="App">
            <Switch>
              {/* If the current URL is /home, this route is rendered
                  while the rest are ignored */}
              <PrivateRoute
                path={HOME_PATH}
                authenticated={this.isAuthenticated()}
                component={Home}
              />
              <Route path={LOGIN_PATH} component={LogIn} />
              <Route path={SIGNUP_PATH} component={SignUp} />
              {/* Note how these two routes are ordered. The more specific
                path="/contact/:id" comes before path="/contact" so that
                route will render when viewing an individual contact */}
              {/* <Route path="/contact/:id">
                <Contact />
              </Route> */}

              {/* If none of the previous routes render anything,
                this route acts as a fallback.*/}
              <Route path={ROOT_PATH} component={About} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);