/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

// CONSTANTES
import SHARED from '@utils/global-constants';

// COMPONENTES PROPIOS
import About from '@components/misc/about/About'
import Common from '@components/main-container/Common';
import Home from '@components/misc/home/Home'
import LogIn from '@components/misc/log-in/LogIn'
import SignUp from '@components/misc/sign-up/SignUp'
import AdvertsIndex from '@components/adverts/Index'
import AdvertsShow from '@components/adverts/Show'
import UsersIndex from '@components/users/Index'
import UsersShow from '@components/users/Show'
import UsersEdit from '@components/users/Edit'
import UsersAdvertsShow from '@components/users/AdvertShow'
import UsersAdvertsNew from '@components/users/AdvertNew'
import UsersAdvertsEdit from '@components/users/AdvertEdit'

////////////////
// CONSTANTES //
////////////////
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={function(props) {
      return authenticated ? <Component {...props} /> : <Redirect to='/log-in' />
    }} />
)

class MyRouter extends Common {
  //////////////////////////
  // MÉTODOS DE INSTANCIA //
  //////////////////////////
  isAuthenticated() {
    return this.getCurrentUser() ? true : false;
  }

  /////////////
  // RENDERS //
  /////////////
  render() {
    return (
      <Switch>
        {/* If the current URL is /home, this route is rendered while the rest are ignored */}

        {/* ////////////// */}
        {/* RUTAS PÚBLICAS */}
        {/* ////////////// */}
        <Route path={SHARED.LOGIN_PATH} component={LogIn} />
        <Route path={SHARED.SIGNUP_PATH} component={SignUp} />

        {/* ADVERT */}
        <Route path={`${SHARED.ADVERTS_PATH}/:advertId`} component={AdvertsShow} />
        <Route path={SHARED.ADVERTS_PATH} component={AdvertsIndex} />

        {/* ////////////// */}
        {/* RUTAS PRIVADAS */}
        {/* ////////////// */}
        <PrivateRoute
          path={SHARED.HOME_PATH}
          authenticated={this.isAuthenticated()}
          component={Home}
        />
        {/* The more specific path="/contact/:id" comes before path="/contact"
          so that route will render when viewing an individual contact */}
        {/* USER */}
        <PrivateRoute
          path={`${SHARED.USERS_PATH}/:userId/adverts/new`}
          authenticated={this.isAuthenticated()}
          component={UsersAdvertsNew}
        />
        <PrivateRoute
          path={`${SHARED.USERS_PATH}/:userId/adverts/:advertId/edit`}
          authenticated={this.isAuthenticated()}
          component={UsersAdvertsEdit}
        />
        <PrivateRoute
          path={`${SHARED.USERS_PATH}/:userId/adverts/:advertId`}
          authenticated={this.isAuthenticated()}
          component={UsersAdvertsShow}
        />
        <PrivateRoute
          path={`${SHARED.USERS_PATH}/:userId/edit`}
          authenticated={this.isAuthenticated()}
          component={UsersEdit}
        />
        <PrivateRoute
          path={`${SHARED.USERS_PATH}/:userId`}
          authenticated={this.isAuthenticated()}
          component={UsersShow}
        />
        <PrivateRoute
          path={`${SHARED.USERS_PATH}`}
          authenticated={this.isAuthenticated()}
          component={UsersIndex}
        />


        {/* If none of the previous routes render anything,
          this route acts as a fallback.*/}
        {/* RUTA RAIZ */}
        <Route path={SHARED.ROOT_PATH} component={About} />
      </Switch>
    );
  };
}

////////////
// EXPORT //
////////////
export default withRouter(MyRouter);