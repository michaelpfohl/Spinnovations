import React from 'react';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import { ProductCard } from '../Components/Cards/ProductCard';

type UserProps = {
  user: User;
};

type cartState = {
  products?: Product[];
};

class Cart extends React.Component<UserProps, cartState> {
  state: cartState = {
    products: [],
  };

  componentDidMount(): void {
    const cartItem = JSON.parse(localStorage.getItem('The Wheel') || '');
    this.state.products?.push(cartItem);
  }

  render(): JSX.Element {
    const { user } = this.props;
    const { products } = this.state;

    const renderProducts = () =>
      products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ));
    console.warn(renderProducts())
    return (
      <div id="cartPage">
        {user != null && (
          <div className="profileCard">
            <div>
              <h3 className="userName">
                Hello, {user.display_Name}! Welcome to your Cart!
              </h3>
            </div>
          </div>
        )}
        <div>{renderProducts()}</div>
      </div>
    );
  }
}

export default Cart;
