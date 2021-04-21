import React from 'react';
import { Switch, Route } from 'react-router-dom';


export default function Routes(): JSX.Element {
  return (
      <Switch>
        {/* <Route exact path="/" component={() => <Home user={user}/>} />
        <Route exact path="/Products" component={() => <Products user={user}/>} />
        <Route exact path="/Payments" component={() => <Payments user={user}/>} />
        <Route exact path="/Orders" component={() => <Orders user={user}/>} />
        <Route component={NotFound} /> */}
      </Switch>
  );
}
