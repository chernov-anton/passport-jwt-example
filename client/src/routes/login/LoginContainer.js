import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import Login from './Login';
import authService from 'services/authService';
import logger from 'utils/logger';
import {useInputsState} from 'utils/inputState';

const ERROR_MESSAGES = {
  401: 'Email or password is invalid!',
  500: 'Something went wrong, please try later.'
};

function createLoginSubmitHandler({values, setLoading, setError, history}) {
  return async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await authService.login(values);
      history.push('/')
    } catch (error) {
      setLoading(false);
      logger.error(error);
      handleErrors(error, setError)
    }
  };
}

function handleErrors(error, setError) {
  let message = 'Service is unavailable!';
  if (error.response) {
    message = ERROR_MESSAGES[error.response.status]
  }
  setError(message);
}

function LoginContainer({history}) {
  const [values, handleChange] = useInputsState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Login
      values={values}
      loading={loading}
      error={error}
      handleChange={handleChange}
      handleSubmit={createLoginSubmitHandler({values, setLoading, setError, history})}
    />
  );
}

export default withRouter(LoginContainer);
