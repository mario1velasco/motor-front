// import config from 'config';
import { handleResponse } from '../helpers/handle-response';
// import { authHeader } from '../helpers/auth-header';
import { authenticationService } from './authentication-service'

export const userService = {
	signUp
};

function signUp(data) {
  const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	};
	debugger
	return fetch(`${process.env.API_URL}/users`, requestOptions)
  // return fetch(`http://localhost:4000/users`, requestOptions)
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