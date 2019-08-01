import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
