import Config from 'config';
import { handleResponse } from '@helpers/handle-response';

export const advertService = {
	saveAdvert,
	// getAdvert
};

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

// function getAdvert(objectId) {
//   const requestOptions = {
// 		method: 'GET',
// 		headers: { 'Content-Type': 'application/json' },
// 		credentials: 'include'
// 	};
// 	return fetch(`${Config.apiUrl}/adverts/${objectId}`, requestOptions)
//   .then(handleResponse)
//   .then(advert => {
// 		return advert;
//   });
// }
