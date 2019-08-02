import React from 'react';
import InlineError from 'components/inline-error';

function Register({handleSubmit, handleChange, values, error, loading}) {
  if (loading) {
    return <h2>Loading</h2>
  }

  return (
    <>
      <h2>Register form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" value={values.email} onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" value={values.password} onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="password">Confirm password</label>
          <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} required/>
        </div>
        {error && <InlineError>{error}</InlineError>}
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
