import React from 'react';
import Home from './Home';
import {useIsLoggedIn} from 'contexts/auth';
import Greetings from './greetings';

function HomeContainer() {
  const isUserLoggedIn = useIsLoggedIn();

  return isUserLoggedIn ? <Greetings/> : <Home />;
}

export default HomeContainer;
