'use strict';

const request = require('supertest');
const faker = require('faker');
const startApp = require('../appConfig');
const {createUser, deleteUser} = require('../testHelpers');

const app = startApp();

describe('GET /users/id', () => {
  it('return user', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await createUser({email, password});

    const resp = await request(app).get(`/users/${user.id}`)
      .expect(200);

    const {hashedPassword, ...secureUser} = user;
    expect(resp.body).toMatchObject(secureUser);
    expect(resp.body.hashedPassword).toBeUndefined();

    await deleteUser(email);
  });

  it('return 404 if user doesn\'t exist', async () => {
    const resp = await request(app).get(`/users/${faker.random.uuid()}`)
      .expect(404);
  });
});