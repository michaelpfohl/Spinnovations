import React from 'react';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import { CartCard } from '../Components/Cards/CartCard';

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

  deleteFromCart = (productKey: string): void => {
    localStorage.removeItem(`${productKey}`);
    this.getTheCart();
  };

  getTheCart = (): void => {
    const keys = Object.keys(localStorage);
    const items: Product[] = [];
    if (localStorage.length) {
      for (const key of keys) {
        const getCartItems = async (): Promise<Product> => {
          const cartItem = await JSON.parse(localStorage.getItem(key) || '');
          items.push(cartItem);
        };
        getCartItems().then(() => {
          this.setState({
            products: items,
          });
        });
      }
    } else {
      this.setState({
        products: [],
      });
    }
  };

  componentDidMount(): void {
    this.getTheCart();
  }

  render(): JSX.Element {
    const { user } = this.props;
    const { products } = this.state;

    const renderProducts = () =>
      products?.map((product: Product) => (
        <CartCard
          key={product.id}
          product={product}
          deleteFromCart={this.deleteFromCart}
        />
      ));
    return (
      <>
        {products?.length === 0 ? (
          <h1>No Products</h1>
        ) : (
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
            <div className="container d-flex flex-wrap justify-content-around">
              {renderProducts()}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Cart;
