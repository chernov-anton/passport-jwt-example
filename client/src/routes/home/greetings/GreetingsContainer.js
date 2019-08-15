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
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const userInfo = await userService.get(authInfo.userId);
        if (isMounted) {
          setUserInfo(userInfo);
          setLoading(false);
        }
      } catch (e) {
        isMounted && setError(true);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [authInfo.userId]);

  return {error, loading, userInfo};
}

function GreetingsContainer() {
  const {error, loading, userInfo} = useAsyncUserInfo();

  return <Greetings error={error} loading={loading} userInfo={userInfo}/>;
}

export default GreetingsContainer;
