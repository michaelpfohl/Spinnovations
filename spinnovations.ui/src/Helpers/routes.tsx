import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Views/Home';
import Products from '../Views/Products';
import Payments from '../Views/Payments';
import Users from '../Views/Users';
import NotFound from '../Views/NotFound';

export default function Routes(): JSX.Element {
  return (
      <Switch>
        <Route exact path="/" component={() => <Home/>} />
        <Route exact path="/Payments" component={() => <Payments/>} />
        <Route exact path="/Products" component={() => <Products/>} />
        <Route exact path="/Users" component={() => <Users/>} />
        <Route component={NotFound} />
      </Switch>
  );
}
