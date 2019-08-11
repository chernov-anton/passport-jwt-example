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
          <div className="app-container">
            <div>
              <Header/>
              <Routes/>
            </div>
            <Footer/>
          </div>
        </AuthProvider>
      </RouterProvider>
    </BrowserRouter>
  );
}

export default App;
