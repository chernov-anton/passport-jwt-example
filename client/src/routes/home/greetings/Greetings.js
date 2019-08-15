import React from 'react';

function Greetings({userInfo, error, loading}) {
  if (error) {
    return(
      <h2>Error!</h2>
    );
  }

  if (loading) {
    return(
      <h2>Loading</h2>
    );
  }

  return (
    <h2>Hello {userInfo.email}!</h2>
  );
}

export default Greetings;
