import React from 'react';

function Greetings({userInfo}) {
  return (<>
    <h2>Hello {userInfo.email}!</h2>
  </>);
}

export default Greetings;
