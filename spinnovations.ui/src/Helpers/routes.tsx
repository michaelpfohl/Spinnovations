import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Payments from '../Views/Payments';
import NotFound from '../Views/NotFound';

export default function Routes(): JSX.Element {
  return (
      <Switch>
        <Route exact path="/Payments" component={() => <Payments/>} />
        <Route component={NotFound} />
      </Switch>
  );
}
