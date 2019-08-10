import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import Register from './Register';
import authService from 'services/authService';
import logger from 'utils/logger';
import {useInputsState} from 'utils/inputState';
import {pipe} from 'utils/func';

const ERROR_MESSAGES = {
  409: 'User already exists!',
  500: 'Something went wrong, please try later.'
};

function useSubmitHandler({values, setLoading, setError, history}) {
  return async (e) => {
    e.preventDefault();
    if (isValid(values)) {
      setError('Passwords should match!');
      return;
    }

    try {
      setLoading(true);
      await authService.register(values);
      history.push('/login')
    } catch (error) {
      setLoading(false);
      logger.error(error);
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

  return [values, handleRegisterChange]
}

function RegisterContainer({history}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, handleChange] = useRegisterInputState(setError);

  return (
    <Register
      values={values}
      loading={loading}
      error={error}
      handleChange={handleChange}
      handleSubmit={useSubmitHandler({values, setLoading, setError, history})}
    />
  );
}

export default withRouter(RegisterContainer);
