import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/" component={Home} exact />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
