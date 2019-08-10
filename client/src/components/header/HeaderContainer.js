import React from 'react';
import {useLogout, useIsLoggedIn} from 'contexts/auth';
import Header from './Header';

function HeaderContainer() {
  const logout = useLogout();
  const isUserLoggedIn = useIsLoggedIn();

  return (
    <Header isUserLoggedIn={isUserLoggedIn} handleLogout={logout}/>
  );
}

export default HeaderContainer;