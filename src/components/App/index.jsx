import React from 'react';
import './App.css';
import LogIn from '@components/misc/log-in/LogIn'
import SignUp from '@components/misc/sign-up/SignUp'
import Home from '@components/user/Index'
// import UserShow from '@components/user/Index'
import About from '@components/misc/about/About'
import Header from '@components/misc/header/Header'
import { history } from '@helpers/history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

class App extends React.Component {
  // RENDERS
  render() {
    // const { currentUser } = this.state;
    return (
      <div>
        <Router history={history}>
          <Header></Header>
          <div className="App">
            <Switch>
              {/* If the current URL is /home, this route is rendered
                  while the rest are ignored */}
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/log-in">
                <LogIn />
              </Route>
              <Route path="/sign-up">
                <SignUp />
              </Route>
              {/* Note how these two routes are ordered. The more specific
                  path="/contact/:id" comes before path="/contact" so that
                  route will render when viewing an individual contact */}
              {/* <Route path="/contact/:id">
                <Contact />
              </Route> */}

              {/* If none of the previous routes render anything,
                  this route acts as a fallback.

                  Important: A route with path="/" will *always* match
                  the URL because all URLs begin with a /. So that's
                  why we put this one last of all */}
              <Route path="/">
                <About />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);