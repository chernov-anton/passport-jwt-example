import React, {useState} from 'react';
import Register from './Register';
import authService from 'services/authService';
import {useInputsState} from 'utils/inputState';
import {useRouterContext} from 'contexts/router';
import {pipe} from 'utils/func';

const ERROR_MESSAGES = {
  409: 'User already exists!',
  500: 'Something went wrong, please try later.'
};

function useSubmitHandler({values, setLoading, setError}) {
  const {history} = useRouterContext();
  return async (e) => {
    e.preventDefault();
    if (isValid(values)) {
      setError('Passwords should match!');
      return;
    }

    try {
      setLoading(true);
      await authService.register(values);
      history.push('/login');
    } catch (error) {
      setLoading(false);
      handleErrors(error, setError);
    }
  };
}

function isValid(values) {
  return values.password !== values.confirmPassword;
}

function handleErrors(error, setError) {
  let message = 'Service is unavailable!';
  if (error.response) {
    message = ERROR_MESSAGES[error.response.status];
  }
  setError(message);
}

function useRegisterInputState(setError) {
  const [values, handleChange] = useInputsState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const clearError = () => setError('');
  const handleRegisterChange = pipe(handleChange, clearError);

  return [values, handleRegisterChange];
}

function RegisterContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, handleChange] = useRegisterInputState(setError);
  const handleSubmit = useSubmitHandler({values, setLoading, setError});

  return (
    <Register
      values={values}
      loading={loading}
      error={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default RegisterContainer;
