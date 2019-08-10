import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import Login from './Login';
import authService from 'services/authService';
import logger from 'utils/logger';
import {useInputsState} from 'utils/inputState';
import {pipe} from 'utils/func';
import {useAuthContext} from 'contexts/auth';

const ERROR_MESSAGES = {
  401: 'Email or password is invalid!',
  500: 'Something went wrong, please try later.'
};

function createLoginSubmitHandler({values, setLoading, setError, history, setAuthState}) {
  return async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await authService.login(values);
      const authInfo = authService.getAuthInfo();
      setAuthState(authInfo);
      history.push('/');
    } catch (error) {
      setLoading(false);
      logger.error(error);
      handleErrors(error, setError);
    }
  };
}

function handleErrors(error, setError) {
  let message = 'Service is unavailable!';
  if (error.response) {
    message = ERROR_MESSAGES[error.response.status];
  }
  setError(message);
}

function LoginContainer({history}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setAuthState] = useAuthContext();

  const [values, handleChange] = useInputsState({
    email: '',
    password: ''
  });

  const handleLoginChange = pipe(handleChange, () => setError(''));
  const handleSubmit = createLoginSubmitHandler({values, setLoading, setError, history, setAuthState});

  return (
    <Login
      values={values}
      loading={loading}
      error={error}
      handleChange={handleLoginChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default withRouter(LoginContainer);
