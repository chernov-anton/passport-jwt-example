'use strict';

let users = [];

class UserRepository {
  findByEmail(email) {
    return users.find(user => user.email === email);
  }

  create(user) {
    users.push(user);
  }

  update(updatedUser) {
    users = users.map(user => this._replaceUser(user, updatedUser));
  }

  _replaceUser(user, updatedUser) {
    if (user.email === updatedUser.email) {
      return updatedUser;
    }

    return user;
  }
}

module.exports = new UserRepository();