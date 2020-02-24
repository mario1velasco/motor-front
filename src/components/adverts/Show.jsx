/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';

// COMPONENTES EXTERNOS
import { Table, Nav, Button } from 'react-bootstrap';

// COMPONENTES PROPIOS
import AdvertsFields from './_Fields';
import Common from '@components/main-container/Common';

// CONSTANTES
import SHARED from '@utils/global-constants';


class AdvertsShow extends Common {
  /////////////
  // RENDERS //
  /////////////
  render() {
    return (
      <div>
        <AdvertsFields
          advertId={this.props.match.params.advertId}>
        </AdvertsFields>
      </div>
    );

  }
}

////////////
// EXPORT //
////////////
export default AdvertsShow;