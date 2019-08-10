import React from 'react';
import authService from 'services/authService';

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
  const [, setAuthState] = useAuthContext(AuthContext);

  return () => {
    authService.logout();
    const authInfo = authService.getAuthInfo();
    setAuthState({authInfo});
  };
}

function useIsLoggedIn() {
  const [authState] = useAuthContext(AuthContext);
  return Boolean(authState.userId);
}

export {AuthProvider, useAuthContext, useLogout, useIsLoggedIn};