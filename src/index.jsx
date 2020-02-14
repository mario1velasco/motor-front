import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
// import './components/App/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
} from "react-router-dom";

ReactDOM.render(
  <div>
    <script
      src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
      crossOrigin="true"
    />

    <script>var Alert = ReactBootstrap.Alert;</script>
    <Router>
      <App />
    </Router>
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
