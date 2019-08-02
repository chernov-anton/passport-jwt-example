import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import Header from './components/header';
import Footer from './components/footer';

import 'app.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div>
          <Header/>
          <Routes/>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
