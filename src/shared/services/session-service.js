// import Service from './service';

class SessionService {

  static authenticateUser(object, headers) {
    object.fields = ['login', 'errors', 'redirectTo'];
    return RestApi.postJSON(super.routes().authenticateUserApiSessionsPath(), object, headers);
  }

}

export default SessionService;