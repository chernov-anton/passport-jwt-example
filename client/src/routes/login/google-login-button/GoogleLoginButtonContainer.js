import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import authService from 'services/authService';
import {useAuthContext} from 'contexts/auth';
import {useRouterContext} from 'contexts/router';

function useSuccessHandler() {
  const [, setAuthState] = useAuthContext();
  const {history} = useRouterContext();
  return async (resp) => {
    console.log(resp);
    await authService.loginWithGoogle(resp.tokenId);
    const authInfo = authService.getAuthInfo();
    setAuthState(authInfo);
    history.push('/');
  };
}

function useErrorHandler() {
  return (resp) => {
    console.log(resp);

  };
}

function GoogleLoginButtonContainer() {
  const successHandler = useSuccessHandler();
  const errorHandler = useErrorHandler();
  return <GoogleLoginButton onSuccess={successHandler} onFailure={errorHandler}/>;
}

export default GoogleLoginButtonContainer;