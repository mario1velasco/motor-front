/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';

// CONSTANTES
import SHARED from '@utils/global-constants';

// HELPERS
import { historyHelper } from '@helpers/history';

// COMPONENTES EXTERNOS
import { Button, Alert, Nav, Table } from 'react-bootstrap';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
export const commonHelper = function() {
  return ({
    // Renderiza el botón de volver
    renderBackButton: function() {
      return (
        <Button variant="link" onClick={ historyHelper.goBack }>{`${SHARED.BUTTON_BACK_TEXT}`}</Button>
      );
    },

    // Renderiza error
    renderError: function(textError) {
      if (textError) {
        return (
          <Alert key="alert" variant='danger'>
            {textError}
          </Alert>
        );
      }
    },

    // Renderiza usuario no registrado
    renderNotAuthenticated: function() {
      return (
        <Alert variant="danger">
          <Alert.Heading>Usuario no registrado.</Alert.Heading>
          <p>
            Para acceder has de loggearte primero
          </p>
          <hr />
          <p className="mb-0">
            Si quieres iniciar sesión, haz click:
            <Nav.Link href="/log-in">
              <Button>aquí</Button>
            </Nav.Link>
            Para volver click en:
          </p>
          {this.renderBackButton()}
        </Alert>
      );
    },

    // Renderiza usuario no permitido
    renderNotPermissions: function() {
      return (
        <Alert variant="danger">
          <Alert.Heading>El usuario no tiene suficientes permisos.</Alert.Heading>
          <p>
            Para acceder has de loggearte primero
          </p>
          <hr />
          <p className="mb-0">
            Si quieres iniciar sesión, haz click:
            <Nav.Link href="/log-in">
              <strong>aquí</strong>
            </Nav.Link>
          </p>
        </Alert>
      );
    },

  })
}

