import { BehaviorSubject } from 'rxjs';

// import config from 'config';
import { handleResponse } from '../helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
	logIn,
	logout,
	currentUser: currentUserSubject.asObservable(),
	get currentUserValue () { return currentUserSubject.value },
	setUser
};

function logIn(data) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	};
	debugger
	return fetch(`${process.env.API_URL}/session/authenticate`, requestOptions)
	// return fetch(`http://localhost:4000/session/authenticate`, requestOptions)
		.then(handleResponse)
		.then(user => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('currentUser', JSON.stringify(user));
			currentUserSubject.next(user);

			return user;
		});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('currentUser');
	currentUserSubject.next(null);
	return true;
}

function setUser(user) {
	// remove user from local storage to log user out
	localStorage.removeItem('currentUser');
	localStorage.setItem('currentUser', JSON.stringify(user));
	currentUserSubject.next(null);
}
