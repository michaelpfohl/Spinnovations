import React from 'react';
import { Switch, Route } from 'react-router-dom';
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

export default function Routes(): JSX.Element {
  return (
      <Switch>
        <Route exact path="/" component={() => <Home/>} />
        <Route exact path="/Payments" component={() => <Payments/>} />
        <Route exact path="/Products" component={() => <Products/>} />
        <Route exact path="/Orders" component={() => <Orders/>} />
        <Route exact path="/Users" component={() => <Users/>} />
        <Route exact path="/Profile" component={() => <Profile/>} />
        <Route exact path='/search/:term/' component={(props : SearchProps) => <SearchResults{...props}/>} />
        <Route exact path="/Products/:id" component={() => <SingleProduct/>} />
        <Route component={NotFound} />
      </Switch>
  );
}
