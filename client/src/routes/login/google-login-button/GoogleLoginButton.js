import React from 'react';
import GoogleLogin from 'react-google-login';
import config from 'config';

function GoogleLoginButton({onSuccess, onFailure}) {
  return (<GoogleLogin
    clientId={config.GOOGLE_CLIENT_ID}
    buttonText="Login with google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy="none"
  />);
}

export default GoogleLoginButton;