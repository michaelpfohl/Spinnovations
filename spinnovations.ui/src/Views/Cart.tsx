import React from 'react';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import CartCard from "../Components/Cards/CartCard";
import PlaceOrderModal from '../Components/Modals/PlaceOrderModal';

type UserProps = {
  user: User;
};

type cartState = {
  products?: Product[];
  cartTotal: number;
  greetingColor: number;
  borderColor: number;
  greet: string,
};
class Cart extends React.Component<UserProps, cartState> {
  state: cartState = {
    products: [],
    cartTotal: 0,
    greetingColor: 0,
    borderColor: 0,
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
      borderColor: Math.floor(Math.random() * 7) + 1,
    });
  }

  handleCallback = (subtotal: number): void => {
    const grandTotal = this.state.cartTotal += subtotal;
    this.setState({
      cartTotal: grandTotal,
    })
  }

  render(): JSX.Element {
    const { products, cartTotal, greetingColor, borderColor, greet } = this.state;
    const cartCards = products?.map((product) => (
      <CartCard key={product.id} product={product} parentCallback={this.handleCallback} remove={this.deleteFromCart} />
    ))
    return (
      <>
        <div id="cart_page">
          <div className="d-flex justify-content-center mt-5 mb-5">
            <div
              className={`cart-container col-10 color-border-${borderColor}`}
            >
              <h1 className={`mb-4 mt-4 color-text-${greetingColor}`}>{greet}</h1>
              <table className={`cart-table mb-4 color-half-border-${borderColor}`}>
                <thead>
                  <tr className="table-head">
                    <th scope="col"></th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {cartCards}
              </table>
              <h1 className={`cart-total mt-2 mb-4 color-text-green} underline`}>
                  Your total comes to... ${cartTotal.toFixed(2)}
                </h1>
                <PlaceOrderModal
                user = {this.props.user}
                products= {products}
                cartTotal= {parseFloat(this.state.cartTotal.toFixed(2))}
                title="Checkout"
              >Checkout</PlaceOrderModal>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Cart;
