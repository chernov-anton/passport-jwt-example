import React from 'react';
import {withRouter} from 'react-router-dom';

const RouterContext = React.createContext({
  match: null,
  location: null,
  history: null
});

function RouterProvider({children, match, location, history}) {
  return (
    <RouterContext.Provider value={{match, location, history}}>
      {children}
    </RouterContext.Provider>
  );
}

function useRouterContext() {
  const context = React.useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouterContext must be used within a RouterProvider');
  }
  return context;
}

export {useRouterContext};

export default withRouter(RouterProvider)