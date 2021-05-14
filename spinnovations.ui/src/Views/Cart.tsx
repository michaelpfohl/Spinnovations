import React from 'react';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import CartCard from "../Components/Cards/CartCard";
import { CategoryTotals } from '../Helpers/Interfaces/ProductCategoryInterfaces';

type UserProps = {
  user: User;
};

type cartState = {
  products?: Product[];
  cartTotal: number;
  greetingColor: number;
  greet: string,
};
class Cart extends React.Component<UserProps, cartState> {
  state: cartState = {
    products: [],
    cartTotal: 0,
    greetingColor: 0,
    greet: '',
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
    const greetings = [
      'Find everything ok?',
      'You look great!',
      'We are so understaffed today.',
      'Do you have any coupons?',
      'Will there be anything else for you today?',
      'Is this everything today?',
      'Your total comes to ...',
      'Would you like your receipt in the bag?',
      'Wow! That\'s quite the haul!',
      'Oh my gosh I love these things!',
      'Oh, I bought one of those! Best decision ever!',
      'You aren\'t gonna regret getting that!'
    ]
    const randomGreeting = greetings[Math.floor(Math.random() * (greetings.length))];
    this.setState({
      greet: randomGreeting,
      greetingColor: Math.floor(Math.random() * 7) + 1,
    });
  }

  handleCallback = (subtotal: number): void => {
    const grandTotal = this.state.cartTotal += subtotal;
    this.setState({
      cartTotal: grandTotal,
    })
  }

  render(): JSX.Element {
    const { products, cartTotal, greetingColor, greet } = this.state;
    const cartCards = products?.map((product) => (
      <CartCard key={product.id} product={product} parentCallback={this.handleCallback} remove={this.deleteFromCart} />
    ))
    return (
      <div id="cart_page">
        <h1 className={`checkout-greeter color-text-${greetingColor}`}>{greet}</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cartCards}
          </tbody>
        </table>
        <hr></hr>
        <div className='cart-container'>
          <h3>Total in cart: {parseFloat(cartTotal.toFixed(2))}</h3>
        </div>
      </div>
    )
  }
}

export default Cart;
