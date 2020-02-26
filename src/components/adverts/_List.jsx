/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// COMPONENTES EXTERNOS
import { Table, Nav, Button } from 'react-bootstrap';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

// CONSTANTES
import SHARED from '@utils/global-constants';


class AdvertsList extends Common {
  /////////////
  // RENDERS //
  /////////////
  render() {
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>{SHARED.ADVERT_MODEL.FIELDS.TITLE}</th>
              <th>{SHARED.ADVERT_MODEL.FIELDS.PRICE}</th>
              <th>{SHARED.ADVERT_MODEL.FIELDS.CITY}</th>
              { this.props.user &&
                <th></th>
              }
            </tr>
          </thead>
          <tbody>
          { this.props.adverts.map(( advert, index ) => {
            return (
              <tr key={index}>
                <td>
                  { this.props.user ?
                    (<Nav.Link href={`${SHARED.USERS_PATH}/${this.props.user.id}/adverts/${advert.id}`}>
                      {advert.title}
                    </Nav.Link>) :
                    (<Nav.Link href={`${SHARED.ADVERTS_PATH}/${advert.id}`}>
                      {advert.title}
                    </Nav.Link>)
                  }
                </td>
                <td>{advert.price}</td>
                <td>{advert.city}</td>
                { this.props.user &&
                  <td>
                    <Button
                      variant="success"
                      onClick={() => this.props.history.push(`${SHARED.USERS_PATH}/${this.props.user.id}/adverts/${advert.id}/edit`)}
                    >
                      {`${SHARED.BUTTONS.EDIT}`}
                    </Button>
                  </td>
                }
              </tr>
            );
          })}
          </tbody>
        </Table>
      </div>
    );

  }
}

////////////
// EXPORT //
////////////
export default withRouter(AdvertsList);