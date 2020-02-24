/////////////
// IMPORTS //
/////////////

// CONSTANTES
import SHARED from '@utils/global-constants';

// SERVICIOS
import { authenticationService } from '../services/authentication-service';

export function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          if (authenticationService.currentUserValue) {
            authenticationService.logOut();
          } else {
            window.location.reload(true);
          }
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}