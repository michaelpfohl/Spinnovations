import React from 'react';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import { createStrictEquality } from 'typescript';
//import { CartCard } from '../Components/Cards/CartCard';

type UserProps = {
  user: User;
};

type cartState = {
  products?: Product[];
  cartTotal: number;
  quantityInCart: number;
};
class Cart extends React.Component<UserProps, cartState> {
  state: cartState = {
    products: [],
    cartTotal: 0,
    quantityInCart: 1,
  };


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  deleteFromCart = (productKey: string): void => {
    localStorage.removeItem(`${productKey}`);
    this.getTheCart();
  };

  getTheCart = (): void => {
    const keys = Object.keys(localStorage);
    const items: Product[] = [];
    let cost = 0;
    if (localStorage.length) {
      for (const key of keys) {
        const getCartItems = async (): Promise<Product> => {
          const cartItem = await JSON.parse(localStorage.getItem(key) || '');
          items.push(cartItem);
          cost = cost + cartItem.price;
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
      });
    }
  };

  componentDidMount(): void {
    this.getTheCart();
  }

  setSubtotals = (product: Product): number => {
    const tax = .0995; //Tennessee State Sales Tax
    //take in the qty from the qty field
    //multiply that, and tax together, assign to variable. Round out to hundreds place
    subtotal = (qty * product.price * tax)
    //return subtotal for display on the DOM
    return subtotal;
  }

  totalTheCart = (): void => {
    //get all subtotals and sum
    //return the number for display on the DOM
  }

  render(): JSX.Element {
    const { products, cartTotal } = this.state;

    const renderProducts = () =>
      products?.map((product: Product) => (
        <tbody key={product.id}>
          <tr>
            <th scope="row">
              <img src={product.imageUrl} alt="product image" />
            </th>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <input id='qtyInput' type='number' step='1' min='1' max={product.quantity_In_Stock} placeholder='1' onChange={event => setQty(event.target.value)}></input>
            </td>
            <td>{this.setSubtotals(product)}</td>
            <td>
              <button
                onClick={() => {
                  this.deleteFromCart(product.name);
                }}
              >
                Remove
            </button>
            </td>
          </tr>
        </tbody>
      ));

    return (
      <div>
        {products?.length === 0 ? (
          <h1>Oops, it appears that your cart is empty!</h1>
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              {renderProducts()}
            </table>
            <hr></hr>
            <h4>Total in Cart: {cartTotal}</h4>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
