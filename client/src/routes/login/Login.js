import React from 'react';

function Login({handleSubmit, handleChange, values, error, loading}) {
  if (loading) {
    return <h2>Loading</h2>
  }

  return (
    <>
      <h2>Login form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" value={values.email} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" value={values.password} onChange={handleChange}/>
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
