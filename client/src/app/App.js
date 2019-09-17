import React from 'react';
import Routes from 'routes';
import Header from 'components/header';
import Footer from 'components/footer';
import api from 'utils/api';
import logger from 'utils/logger';
import authService from 'services/authService';
import {useLogout} from 'contexts/auth';

import './app.css';

function useIsSetupComplete() {
  const [isSetupComplete, setSetupStatus] = React.useState(false);
  const logout = useLogout();
  React.useEffect(() => {
    api.interceptors.request.use(request);
    api.interceptors.response.use(res => res, errorResponse(logout));
    setSetupStatus(true);
  }, [logout]);

  return isSetupComplete;
}

function App() {
  const isSetupComplete = useIsSetupComplete();

  return isSetupComplete && (
    <div className="auth-app">
      <div>
        <Header/>
        <Routes/>
      </div>
      <Footer className="auth-app__footer"/>
    </div>
  );
}

function request(reqConfig) {
  const token = authService.getAuthInfo().token;
  if (token) {
    reqConfig.headers.authorization = `Bearer ${token}`;
  }

  return reqConfig;
}

function errorResponse(logout) {
  return (error) => {
    logger.error(error);
    if (error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  };
}

export default App;
