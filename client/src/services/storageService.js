const TOKEN_KEY = 'AUTH_TOKEN';

class StorageService {
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    localStorage.getItem(TOKEN_KEY);
  }

  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export default new StorageService();