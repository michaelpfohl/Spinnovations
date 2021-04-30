import React, { Component } from 'react';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';

class Profile extends Component {
  state = {
    product: Product,
  };

  render(): JSX.Element {
    const { product } = this.state;
    return (
      <div>
          <h1>{product.name}</h1>
      </div>
    );
  }
}

export default Profile;
