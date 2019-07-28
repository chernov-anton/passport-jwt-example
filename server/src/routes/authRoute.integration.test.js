'use strict';

const request = require('supertest');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const startApp = require('../appConfig');
const passwordUtils = require("../utils/passwordUtils");
const {createUser, deleteUser, findUserByEmail} = require('../testHelpers');
const {JWT} = require('../const');

const app = startApp();

describe('POST /login', () => {
  it('throw 401 if user doesn\'t exist', async () => {
    const credentials = {email: faker.internet.email(), password: faker.internet.password()};
    await request(app).post('/login')
      .send(credentials)
      .expect(401, {message: 'Email or password is invalid!'});
  });

  it('throw 401 if password is wrong', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const wrongPassword = faker.internet.password();
    await createUser({email, password});
    const credentials = {email, password: wrongPassword};

    await request(app).post('/login')
      .send(credentials)
      .expect(401, {message: 'Email or password is invalid!'});

    await deleteUser(email);
  });

  it('return token if credentials are valid', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await createUser({email, password});
    const credentials = {email, password};

    const resp = await request(app).post('/login')
      .send(credentials)
      .expect(200);

    const jwtPayload = jwt.verify(resp.body.token, JWT.secret);
    expect(jwtPayload.id).toBe(user.id);

    await deleteUser(email);
  });
});

describe('POST /register', () => {
  it('throw 409 if user with the same email already exists', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    await createUser({email, password});
    const credentials = {email, password};
    await request(app).post('/register')
      .send(credentials)
      .expect(409, {message: 'User already exists!'});

    await deleteUser(email);
  });

  it('register user successfully', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const credentials = {email, password};

    await request(app).post('/register')
      .send(credentials)
      .expect(204);

    const user = await findUserByEmail(email);
    expect(user.email).toContain(email);
    expect(passwordUtils.isPasswordValid(password, user.hashedPassword)).toBeTruthy();

    await deleteUser(email);
  });
});
