import api from 'utils/api';

class UserService {
  async get(id) {
    const resp = await api.get(`/users/${id}`);
    return resp.data;
  }
}

export default new UserService();