import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { User } from '../Helpers/Interfaces/UserInterfaces';

import Home from '../Views/Home';
import Products from '../Views/Products';
import Payments from '../Views/Payments';
import Users from '../Views/Users';
import Orders from '../Views/Orders';
import Profile from '../Views/Profile'
import AddProduct from '../Views/AddProduct';
import Sales from '../Views/Sales';
import NotFound from '../Views/NotFound';
import SearchResults from '../Views/SearchResults';
import { SearchProps } from '../Helpers/Interfaces/SearchInterfaces';
import SingleProduct from '../Views/SingleProduct';
import { ProductProps } from '../Helpers/Interfaces/ProductInterfaces';
import Cart from '../Views/Cart';
import SingleSeller from '../Views/SingleSeller';
import { SellerProps } from '../Helpers/Interfaces/SellerInterfaces';
import {OrderProps} from '../Helpers/Interfaces/OrderInterfaces'
import {PaymentProps} from '../Helpers/Interfaces/PaymentInterfaces';
import Spin from '../Views/Spin';
import Checkout from '../Views/Checkout';
import {CheckoutProps} from '../Helpers/Interfaces/CheckoutInterfaces';

type RouteProps = {
  user: User | null
}

export default function Routes({ user}: RouteProps): JSX.Element {
  return (
      <Switch>
        <Route exact path="/" component={() => <Home/>} />
        <Route exact path="/Payments" component={(props: PaymentProps) => <Payments{...props}/>} />
        <Route exact path="/Products" component={() => <Products/>} />
        <Route exact path="/Orders" component={(props: OrderProps) => <Orders{...props}/>} />
        <Route exact path="/Users" component={() => <Users user={user}/>} />
        <Route exact path="/Add-Product" component={() => <AddProduct user={user}/>}/>
        <Route exact path="/Profile" component={() => <Profile user={user}/>} />
        <Route exact path='/search/:term/' component={(props : SearchProps) => <SearchResults{...props}/>} />
        <Route exact path="/Cart" component={() => <Cart user={user}/>} />
        <Route exact path="/seller/:id" component={(props: SellerProps) => <SingleSeller{...props}/>} />
        <Route exact path="/details" component={(props: ProductProps) => <SingleProduct{...props} user={user}/>} />
        <Route exact path="/checkout" component={(props: CheckoutProps) => <Checkout{...props} user={user}/>} />
        <Route exact path="/sales" component={(props: OrderProps) => <Sales{...props}/>}/>
        <Route exact path="/spin" component={() => <Spin/>}/>
        <Route component={NotFound} />
      </Switch>
  );
}
