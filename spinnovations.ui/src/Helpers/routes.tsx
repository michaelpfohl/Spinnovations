import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { User } from '../Helpers/Interfaces/UserInterfaces';

import Home from '../Views/Home';
import Products from '../Views/Products';
import Payments from '../Views/Payments';
import Users from '../Views/Users';
import Orders from '../Views/Orders';
import NotFound from '../Views/NotFound';

type RouteProps = {
  user: User | null
}

export default function Routes({ user}: RouteProps): JSX.Element {
  return (
      <Switch>
        <Route exact path="/" component={() => <Home/>} />
        <Route exact path="/Payments" component={() => <Payments/>} />
        <Route exact path="/Products" component={() => <Products/>} />
        <Route exact path="/Orders" component={() => <Orders/>} />
        <Route exact path="/Users" component={() => <Users user={user}/>} />
        <Route component={NotFound} />
      </Switch>
  );
}
