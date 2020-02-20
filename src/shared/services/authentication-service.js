import { BehaviorSubject } from 'rxjs';

import Config from 'config';
import { handleResponse } from '../helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
	logIn,
	logOut,
	currentUser: currentUserSubject.asObservable(),
	get currentUserValue () { return currentUserSubject.value },
	setUser,
};

function logIn(data) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(data)
	};
	return fetch(`${Config.apiUrl}/session/authenticate`, requestOptions)
		.then(handleResponse)
		.then(user => {
			// store user details in local storage to keep user logged in between page refreshes
			localStorage.setItem('currentUser', JSON.stringify(user));
			currentUserSubject.next(user);
			return user;
		});
}

function logOut() {
	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
		// body: JSON.stringify(data)
	};
	return fetch(`${Config.apiUrl}/session/`, requestOptions)
		.then(handleResponse)
		.then(response => {
			localStorage.removeItem('currentUser');
			currentUserSubject.next(null);
			return response;
		});
}

function setUser(user) {
	// set user from local storage
	localStorage.removeItem('currentUser');
	localStorage.setItem('currentUser', JSON.stringify(user));
	currentUserSubject.next(null);
}

