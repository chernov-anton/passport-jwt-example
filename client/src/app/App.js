import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from '../routes';
import Header from '../components/header';
import Footer from '../components/footer';

import AuthProvider from '../contexts/auth';
import RouterProvider from '../contexts/router';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <RouterProvider>
        <AuthProvider>
          <div className="auth-app">
            <div>
              <Header/>
              <Routes/>
            </div>
            <Footer className="auth-app__footer"/>
          </div>
        </AuthProvider>
      </RouterProvider>
    </BrowserRouter>
  );
}

export default App;
