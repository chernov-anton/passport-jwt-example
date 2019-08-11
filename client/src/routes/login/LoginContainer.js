import React, {useState} from 'react';
import Login from './Login';
import authService from 'services/authService';
import logger from 'utils/logger';
import {useInputsState} from 'utils/inputState';
import {pipe} from 'utils/func';
import {useAuthContext} from 'contexts/auth';
import {useRouterContext} from 'contexts/router';

const ERROR_MESSAGES = {
  401: 'Email or password is invalid!',
  500: 'Something went wrong, please try later.'
};

function useSubmitHandler({values, setLoading, setError}) {
  const [, setAuthState] = useAuthContext();
  const {history} = useRouterContext();
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

function useLoginInputState(setError) {
  const [values, handleChange] = useInputsState({
    email: '',
    password: ''
  });

  const clearError = () => setError('');
  const handleLoginChange = pipe(handleChange, clearError);

  return [values, handleLoginChange]
}

function LoginContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, handleChange] = useLoginInputState(setError);
  const handleSubmit = useSubmitHandler({values, setLoading, setError});

  return (
    <Login
      values={values}
      loading={loading}
      error={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default LoginContainer;
