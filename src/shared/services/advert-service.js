import Config from 'config';
import { handleResponse } from '@helpers/handle-response';

export const advertService = {
	saveAdvert,
	getAdverts,
	getAdvert,
	deleteAdvert,
};

function getAdverts(objectId) {
	const url = objectId ?
		`${Config.apiUrl}/adverts?user=${objectId}` :
		`${Config.apiUrl}/adverts`
  const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	};
	return fetch(url, requestOptions)
  .then(handleResponse)
  .then(adverts => {
		return adverts;
  });
}

function saveAdvert(object, objectId) {
	// Nuevo
	if (!objectId) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(object)
		};
		return fetch(`${Config.apiUrl}/adverts`, requestOptions)
		.then(handleResponse)
		.then(advert => {
			return advert;
		});
	// Actualizar
	}	else {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(object)
		};
		return fetch(`${Config.apiUrl}/adverts/${objectId}`, requestOptions)
		.then(handleResponse)
		.then(advert => {
			return advert;
		});
	}
}

function getAdvert(objectId) {
	const url = `${Config.apiUrl}/adverts/${objectId}`;
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		credentials: 'include'
	};
	return fetch(url, requestOptions)
	.then(handleResponse)
	.then(advert => {
		return advert;
	})
	.catch(function(reason) {
		console.log(reason);
 	});
}

function deleteAdvert(objectId) {
	const url = `${Config.apiUrl}/adverts/${objectId}`;
	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		credentials: 'include'
	};
	return fetch(url, requestOptions)
	.then(handleResponse)
	.then(advert => {
		return advert;
	})
	.catch(function(reason) {
		console.log(reason);
 	});
}
