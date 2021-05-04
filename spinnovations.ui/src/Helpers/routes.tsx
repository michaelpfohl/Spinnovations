import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { User } from '../Helpers/Interfaces/UserInterfaces';

import Home from '../Views/Home';
import Products from '../Views/Products';
import Payments from '../Views/Payments';
import Users from '../Views/Users';
import Orders from '../Views/Orders';
import Profile from '../Views/Profile'
import NotFound from '../Views/NotFound';
import SearchResults from '../Views/SearchResults';
import { SearchProps } from '../Helpers/Interfaces/SearchInterfaces';
import SingleProduct from '../Views/SingleProduct';
import { ProductProps } from '../Helpers/Interfaces/ProductInterfaces';
import Cart from '../Views/Cart';

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
        <Route exact path="/Profile" component={() => <Profile user={user}/>} />
        <Route exact path='/search/:term/' component={(props : SearchProps) => <SearchResults{...props}/>} />
        <Route exact path="/Cart" component={() => <Cart user={user}/>} />
        <Route exact path="/details" component={(props: ProductProps) => <SingleProduct{...props}/>} />
        <Route component={NotFound} />
      </Switch>
  );
}
