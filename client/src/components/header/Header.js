import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link className="logo" to="/">Home</Link>
      <Link className="button" to="/login">Login</Link>
      <Link className="button" to="/register">Register</Link>
    </header>
  );
}

export default Header;