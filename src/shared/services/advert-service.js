import Config from 'config';
import { handleResponse } from '@helpers/handle-response';

export const advertService = {
	saveAdvert,
	getAdverts,
	getAdvert,
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
	}
	// else {
	// 	const requestOptions = {
	// 		method: 'PUT',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		credentials: 'include',
	// 		body: JSON.stringify(object)
	// 	};
	// 	return fetch(`${Config.apiUrl}/adverts/${objectId}`, requestOptions)
	// 	.then(handleResponse)
	// 	.then(advert => {
	// 		return advert;
	// 	});
	// }
}

function getAdvert(objectId) {
	const url = `${Config.apiUrl}/adverts/${objectId}`;
	const requestOptions = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': 'http://localhost:8080',
			'Access-Control-Allow-Credentials': true,
			// 'Content-Type': 'application/json' ,
			// 'Content-Type': 'text/html; charset=utf-8',
			// 'X-Powered-By': 'Express',
			// 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
			// 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
			// 'X-Content-Type-Options': 'nosniff',
			// 'Content-Length': '1800',
			// 'Connection': 'keep-alive',
			// 'Content-Security-Policy': 'default-src 'none'',
		},
		// credentials: 'include'
	};
	return fetch(url, requestOptions)
	.then(handleResponse)
	.then(adverts => {
		return adverts;
	})
	.catch(function(reason) {
		console.log(reason);
 });
}
