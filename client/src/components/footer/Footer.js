import React from 'react';
import classnames from 'classnames'

function Footer({className}) {
  return (
    <footer className={classnames('sticky', className)}>
      <p className="doc">© 2019 Anton Chernov </p>
    </footer>
  );
}

export default Footer;