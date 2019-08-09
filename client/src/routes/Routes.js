import React from 'react';
import {Route} from 'react-router-dom';
import Login from './login';
import Register from './register';
import Home from './home';

function Routes() {
  return (
    <>
      <Route path="/" exact component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </>
  );
}

export default Routes;