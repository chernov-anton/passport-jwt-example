import api from 'utils/api';
import decode from 'jwt-decode';
import storageService from './storageService';

class AuthService {
  async login({email, password}) {
    const resp = await api.post('/login', {email, password});
    storageService.setToken(resp.data.token);
  }

  register({email, password}) {
    return api.post('/register', {email, password});
  }

  logout() {
    storageService.deleteToken();
  }

  getAuthInfo() {
    const authInfo = {
      token: '',
      userId: ''
    };

    const token = storageService.getToken();
    if (!token) {
      return authInfo;
    }

    const tokenPayload = decode(token);
    if (tokenPayload.exp < Date.now() / 1000) {
      return authInfo;
    }

    return {
      token,
      userId: tokenPayload.sub
    };
  }
}

export default new AuthService();