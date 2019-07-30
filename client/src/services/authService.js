import api from 'utils/api'
import storageService from './storageService';

class AuthService {
  async login({email, password}) {
    const resp =  await api.post('/login', {email, password});

    if (!resp.token) {
      throw new Error('There is no token in response!')
    }

    storageService.setToken(resp.token)
  }

  register({email, password}) {
    return api.post('/register', {email, password})
  }
}

export default new AuthService();