import axios from 'axios';
import authService from 'services/authService';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000
});

function onRequest() {
  return (reqConfig) => {
    const token = authService.getAuthInfo().token;
    if (token) {
      reqConfig.headers.authorization = `Bearer ${token}`;
    }

    return reqConfig;
  };
}

instance.interceptors.request.use(onRequest());

export default instance;