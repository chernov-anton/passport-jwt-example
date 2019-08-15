import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AuthProvider from 'contexts/auth';
import RouterProvider from 'contexts/router';
import App from './App';

function AppContainer() {
  return (
    <BrowserRouter>
      <RouterProvider>
        <AuthProvider>
          <App/>
        </AuthProvider>
      </RouterProvider>
    </BrowserRouter>
  );
}

export default AppContainer;
