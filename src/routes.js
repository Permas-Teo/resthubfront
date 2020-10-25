import React from 'react';

import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import AllContactsPage from './Pages/AllContactsPage';
import NotFoundPage from './Pages/NotFoundPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/allcontacts" component={AllContactsPage} />
      <Route path="/*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
