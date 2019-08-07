'use strict';

const request = require('supertest');
const faker = require('faker');
const startApp = require('../appConfig');
const {createUser, deleteUser} = require('../testHelpers');
const jwtUtils = require('../utils/jwtUtils');

const app = startApp();

describe('GET /users/id', () => {
  it('return user info', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await createUser({email, password});

    const resp = await request(app).get(`/users/${user.id}`)
      .set('Authorization', `Bearer ${jwtUtils.signToken(user.id)}`)
      .expect(200);

    const {hashedPassword, ...secureUser} = user;
    expect(resp.body).toMatchObject(secureUser);
    expect(resp.body.hashedPassword).toBeUndefined();

    await deleteUser(email);
  });

  it('throw 401 without token', async () => {
    await request(app).get(`/users/${faker.random.uuid()}`)
      .expect(401);
  });

  it('throw 403 if user gets try to get info about other user', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await createUser({email, password});

    const otherEmail = faker.internet.email();
    const otherPassword = faker.internet.password();
    const otherUser = await createUser({email: otherEmail, password: otherPassword});

    await request(app).get(`/users/${otherUser.id}`)
      .set('Authorization', `Bearer ${jwtUtils.signToken(user.id)}`)
      .expect(403);

    await deleteUser(email);
    await deleteUser(otherEmail);
  });

  it('return 404 if user doesn\'t exist', async () => {
    const id = faker.random.uuid();
    await request(app).get(`/users/${id}`)
      .set('Authorization', `Bearer ${jwtUtils.signToken(id)}`)
      .expect(404);
  });
});