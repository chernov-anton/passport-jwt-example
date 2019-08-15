import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import authService from 'services/authService';
import {useAuthContext} from 'contexts/auth';
import {useRouterContext} from 'contexts/router';
import logger from 'utils/logger';

function useSuccessHandler() {
  const [, setAuthState] = useAuthContext();
  const {history} = useRouterContext();
  return async (resp) => {
    await authService.loginWithGoogle(resp.tokenId);
    const authInfo = authService.getAuthInfo();
    setAuthState(authInfo);
    history.push('/');
  };
}

function useErrorHandler() {
  return (resp) => {
    // TODO implement proper error handling
    logger.error(resp);
  };
}

function GoogleLoginButtonContainer() {
  const successHandler = useSuccessHandler();
  const errorHandler = useErrorHandler();
  return <GoogleLoginButton onSuccess={successHandler} onFailure={errorHandler}/>;
}

export default GoogleLoginButtonContainer;