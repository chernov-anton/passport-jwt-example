import React from 'react';
import Greetings from './Greetings';
import userService from 'services/userService';
import {useAuthContext} from 'contexts/auth';

function useAsyncUserInfo() {
  const [authInfo] = useAuthContext();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        console.log('call');
        const userInfo = await userService.get(authInfo.userId);
        setUserInfo(userInfo);
        setLoading(false);
      } catch (e) {
        setError(true);
      }
    }

    fetchData();
  }, [authInfo.userId]);

  return {error, loading, userInfo};
}

function GreetingsContainer() {
  const {error, loading, userInfo} = useAsyncUserInfo();

  return <Greetings error={error} loading={loading} userInfo={userInfo}/>;
}

export default GreetingsContainer;
