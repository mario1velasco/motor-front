import React from 'react';
import './App.css';
import LogIn from '../misc/log-in/LogIn'
import SignUp from '../misc/sign-up/SignUp'
import Home from '../misc/home/Home'
import About from '../misc/about/About'
import Header from '../misc/header/Header'
import {
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <div>
      <Header></Header>
      <Switch>
        {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
        <Route path="/about">
          <About />
        </Route>

        {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
        {/* <Route path="/contact/:id">
          <Contact />
        </Route> */}
        <Route path="/log-in">
          <LogIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>

        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
