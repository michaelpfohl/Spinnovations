import React from 'react';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import { CartProps } from '../Helpers/Interfaces/CartInterfaces';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';

type UserProps = {
  user: User;
};

type CartState = {
  inCart?: Product[];
  user: User;
};

class Cart extends React.Component<CartProps, UserProps> {
    state: CartState = {
      inCart: [],
      user: User,
    };

  setUrl = (): void => {
    this.props.history.push(`/search/${this.state.user.id}`);
  };
  componentDidMount(): void {
    this.setUrl;
  }

  render(): JSX.Element {
    const { user } = this.props;
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
      </div>
    );
  }
}

export default Cart;
