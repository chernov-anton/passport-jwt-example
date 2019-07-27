import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import NavBar from 'components/nav-bar';
import Login from './login';
import Register from './register';
import Home from './home';

function Router() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Route path="/" exact component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </BrowserRouter>
  );
}

export default Router;