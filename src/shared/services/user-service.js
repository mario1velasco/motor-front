import Config from 'config';
import { handleResponse } from '@helpers/handle-response';

export const userService = {
	saveUser,
	getUser
};

function saveUser(object, objectId) {
	// Nuevo
	if (!objectId) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(object)
		};
		return fetch(`${Config.apiUrl}/users`, requestOptions)
		.then(handleResponse)
		.then(user => {
			return user;
		});
	// Actualizar
	} else {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(object)
		};
		return fetch(`${Config.apiUrl}/users/${objectId}`, requestOptions)
		.then(handleResponse)
		.then(user => {
			return user;
		});
	}
}

function getUser(objectId) {
  const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	};
	return fetch(`${Config.apiUrl}/users/${objectId}`, requestOptions)
  .then(handleResponse)
  .then(user => {
		return user;
  });
}
