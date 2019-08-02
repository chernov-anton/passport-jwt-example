import React from 'react';

import './inline-error.css'

function InlineError({children}) {
  return (
    <div className="inline-error">
      {children}
    </div>
  );
}

export default InlineError;