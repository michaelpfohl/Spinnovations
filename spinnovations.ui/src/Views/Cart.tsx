import React from 'react';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import CartCard from "../Components/Cards/CartCard";

type UserProps = {
  user: User;
};

type cartState = {
  products?: Product[];
  cartTotal: number;
};
class Cart extends React.Component<UserProps, cartState> {
  state: cartState = {
    products: [],
    cartTotal: 0,
  };

  deleteFromCart = (product: Product, qty: number): void => {
    localStorage.removeItem(`${product.name}`);
    this.resetTotal(product, qty);
  }

  resetTotal = (product: Product, qty: number): void => {
    const keys = Object.keys(localStorage);
    const items: Product[] = [];
    const newCost = this.state.cartTotal - (product.price * qty);
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
      this.setState({
        cartTotal: newCost,
      })
    } else {
      this.setState({
        products: [],
        cartTotal: 0,
      });
    } 
  }

  getTheCart = (): void => {
    const keys = Object.keys(localStorage);
    const items: Product[] = [];
    let cost = 0;
    if (localStorage.length) {
      for (const key of keys) {
        const getCartItems = async (): Promise<Product> => {
          const cartItem = await JSON.parse(localStorage.getItem(key) || '');
          items.push(cartItem);
          cost += cartItem.price;
        };
        getCartItems().then(() => {
          this.setState({
            products: items,
            cartTotal: cost,
          });
        });
      }
    } else {
      this.setState({
        products: [],
        cartTotal: 0,
      });
    } 
  };

  componentDidMount(): void {
    this.getTheCart();
  }

  handleCallback = (subtotal: number): void => {    
    const grandTotal = this.state.cartTotal += subtotal;
    this.setState({
      cartTotal: grandTotal,
    })
  }

  render(): JSX.Element {
    const { products, cartTotal } = this.state;
    const cartCards = products?.map((product) => (
      <CartCard key={product.id} product={product} parentCallback={this.handleCallback} remove={this.deleteFromCart}/>
    ))
    return (
      <div id="cart_page">
        <h1>Find everything you need?</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartCards}
          </tbody>
        </table>
        <hr></hr>
        <h3>Total in cart: {parseFloat(cartTotal.toFixed(2))}</h3>
      </div>
    )
  }
}

export default Cart;
