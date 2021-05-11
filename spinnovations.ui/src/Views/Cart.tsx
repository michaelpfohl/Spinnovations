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


  getTheCart = (): void => {
    const keys = Object.keys(localStorage);
    const items: Product[] = [];
    //let cost = 0;
    if (localStorage.length) {
      for (const key of keys) {
        const getCartItems = async (): Promise<Product> => {
          const cartItem = await JSON.parse(localStorage.getItem(key) || '');
          items.push(cartItem);
          //cost += cartItem.price;
        };
        getCartItems().then(() => {
          this.setState({
            products: items,
            // cartTotal: cost,
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
    
  }

  totalTheCart = (): void => {
    
    //get all subtotals
    //sum them together
    //add tax (sum + (sum*tax))
    //return it to the DOM
  }

  render(): JSX.Element {
    const { products, cartTotal } = this.state;
    const cartCards = products?.map((product) => (
      <CartCard key={product.id} product={product} parentCallback={this.handleCallback}/>
    ))
    return (
      <div>
        <h1>Here is cart</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">name</th>
              <th scope="col">price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartCards}
          </tbody>
        </table>
        <hr></hr>
        <h3>Total in cart: {cartTotal}</h3>
      </div>
    )
    
  }
}

export default Cart;
