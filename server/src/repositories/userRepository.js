'use strict';

const uuidv4 = require('uuid/v4');
let users = [];

// add async because it will be always async in real app
class UserRepository {
  async find(id) {
    return users.find(user => user.id === id);
  }

  async findByEmail(email) {
    return users.find(user => user.email === email);
  }

  async findByGoogleId(googleId) {
    return users.find(user => user.googleId === googleId);
  }

  async create(user) {
    user.id = uuidv4();
    users.push(user);

    return user;
  }

  async update(updatedUser) {
    users = users.map(user => this._replaceUser(user, updatedUser));

    return updatedUser;
  }

  async delete(id) {
    users = users.filter(user => !(user.id === id))
  }

  _replaceUser(user, updatedUser) {
    if (user.id === updatedUser.id) {
      return {...user, ...updatedUser};
    }

    return user;
  }
}

module.exports = new UserRepository();