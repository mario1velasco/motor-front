/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';

// COMPONENTES PROPIOS
import AdvertsFields from './_Fields';
import Common from '@components/main-container/Common';


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