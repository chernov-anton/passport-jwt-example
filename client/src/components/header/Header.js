import React from 'react';
import {Link} from 'react-router-dom';

function Header({isUserLoggedIn, handleLogout}) {
  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-11">
            <Link className="logo" to="/">Home</Link>
            <Link className="button" to="/login">Login</Link>
            <Link className="button" to="/register">Register</Link>
          </div>
          {isUserLoggedIn && <div className="col-sm-1"><a className="button" onClick={handleLogout}>Logout</a></div>}
        </div>
      </div>

    </header>
  );
}

export default Header;