# Passport jwt example

# Backend

Simple express app with mocked data access layer.

## Auth routes:

### Login
url: POST `/auth/login`

body: `{email, password}`

### Register
url: POST `/auth/register`

body: `{email, password}`

### Login with google
url: POST `/auth/google`

body: `{access_token}` - actually it should be id token from google response, 
but passport-token-google strategy require it in this format.

## User routes:

### Register
url: GET `/users/:id`

Require `Authoriztion: Bearer <token>` header.
For now it allows to request only current user. Can be extended to allow requests for other users based on rights/scopes.

# Frontend

React app build with hooks and context.
Several simple routes. Login form, registration form and home page. App saves token in local storage.

# Points to extends

* Add roles/rights(e.g. admin, user)
* Add some additional fields during registration
* Verify email during registration

