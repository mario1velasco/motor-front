/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter, Router } from "react-router-dom";

// HELPERS
import { historyHelper } from '@helpers/history';

// ESTILOS PROPIOS
import './App.css';

// COMPONENTES PROPIOS
import Header from '@components/misc/header/Header'
import MyRouter from '@components/misc/router/MyRouter'

class App extends React.Component {
  /////////////
  // RENDERS //
  /////////////
  render() {
    return (
      <Router history={historyHelper}>
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