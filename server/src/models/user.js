'use strict';

class User {
  constructor({id, email, hashedPassword, googleId}) {
    this.id = id;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.googleId = googleId;
  }
}

module.exports = User;