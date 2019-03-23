import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './routes';

const App = () => {
  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.key} {...route} />
      ))}
    </Switch>
  );
};

export default App;
