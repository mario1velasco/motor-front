// import Service from './service';

class UserService {

  static createUser(object, headers) {
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(object),
    })
    .then((response) => {
      return response.json()
    })
    .catch(console.log)
  }
 

}

export default UserService;