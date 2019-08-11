import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

function Header({isUserLoggedIn, handleLogout}) {
  return (
    <header className="auth-header">
      <Link className="logo" to="/">Home</Link>
      {!isUserLoggedIn &&
      <>
        <Link className="button" to="/login">Login</Link>
        <Link className="button" to="/register">Register</Link>
      </>}
      {isUserLoggedIn &&
      <button className="button auth-header__logout" onClick={handleLogout}>Logout</button>
      }
    </header>
  );
}

export default Header;