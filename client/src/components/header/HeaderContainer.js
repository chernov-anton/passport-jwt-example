import React from 'react';
import {useAuthContext} from 'contexts/auth';
import Header from './Header';
import authService from 'services/authService';

function HeaderContainer() {
  const [authState, setAuthState] = useAuthContext();
  const isUserLoggedIn = Boolean(authState.userId);

  const handleLogout = () => {
    authService.logout();
    const authInfo = authService.getAuthInfo();
    setAuthState({authInfo});
  };

  return (
    <Header isUserLoggedIn={isUserLoggedIn} handleLogout={handleLogout}/>
  );
}

export default HeaderContainer;