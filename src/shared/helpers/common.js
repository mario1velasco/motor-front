/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';

// HELPERS
import { HistoryHelper } from '@helpers/history';

// COMPONENTES EXTERNOS
import { Button } from 'react-bootstrap';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
export const CommonHelper = function() {
  return ({
    // Renderiza el botón de volver
    renderBackButton: function() {
      return (
        <Button variant="primary" onClick={HistoryHelper.goBack}>Volver</Button>
      );
    },
  })
}

