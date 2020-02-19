import Config from 'config';
import { handleResponse } from '@helpers/handle-response';
// import { authHeader } from '../helpers/auth-header';
import { authenticationService } from './authentication-service'

export const userService = {
	signUp
};

function signUp(data) {
  const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(data)
	};
	return fetch(`${Config.apiUrl}/users`, requestOptions)
  .then(handleResponse)
  .then(user => {
		authenticationService.setUser(user)
		return user;
  });
}

// function getAll() {
//     const requestOptions = { method: 'GET', headers: authHeader() };
//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }