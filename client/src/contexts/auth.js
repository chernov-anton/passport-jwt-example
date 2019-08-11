import React from 'react';
import authService from 'services/authService';
import {useRouterContext} from './router';

const AuthContext = React.createContext();
const initialAuthInfo = authService.getAuthInfo();

function AuthProvider({children}) {
  const [state, setState] = React.useState(initialAuthInfo);
  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}

function useLogout() {
  const [, setAuthState] = useAuthContext();
  const {history} = useRouterContext();

  return () => {
    authService.logout();
    const authInfo = authService.getAuthInfo();
    setAuthState({authInfo});
    history.push('/login')
  };
}

function useIsLoggedIn() {
  const [authState] = useAuthContext();
  return Boolean(authState.userId);
}

export {useAuthContext, useLogout, useIsLoggedIn};
export default AuthProvider

