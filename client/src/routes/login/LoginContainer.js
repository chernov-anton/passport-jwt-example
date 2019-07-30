import React, {useState, useReducer} from 'react';
import Login from './Login';
import authService from 'services/authService';
import logger from 'utils/logger';

function useInputsState(initialValues) {
  const [values, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    initialValues
  );

  const handleChange = evt => {
    const {name, value} = evt.target;

    setUserInput({[name]: value});
  };

  return [values, handleChange];
}

const ERROR_MESSAGES = {
  401: 'Email or password is invalid!',
  500: 'Something went wrong, please try later.'
};

function createSubmitHandler(values, setLoading, setError) {
  return async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await authService.login({data: values});
    } catch (error) {
      logger.error(error);
      handleErrors(error, setError)
    } finally {
      setLoading(false);
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

function LoginContainer() {
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
      handleSubmit={createSubmitHandler(values, setLoading, setError)}
    />
  );
}

export default LoginContainer;
