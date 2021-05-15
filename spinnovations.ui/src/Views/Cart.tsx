import React from 'react';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import CartCard from "../Components/Cards/CartCard";
import PlaceOrderModal from '../Components/Modals/PlaceOrderModal';
import Products from './Products';

type UserProps = {
  user: User;
};
type ProductQuantity = {
  productId: number,
  quantity: number
}
type cartState = {
  products?: Product[];
  cartTotal: number;
  productQuantities: ProductQuantity[],
};
class Cart extends React.Component<UserProps, cartState> {
  state: cartState = {
    products: [],
    cartTotal: 0,
    productQuantities: []
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
          const productQuantities: ProductQuantity[] = [];
          items.forEach((item) => {
            const productQuantity: ProductQuantity = {
              productId: item.id,
              quantity: 1
            }
            productQuantities.push(productQuantity);
          })
          this.setState({
            products: items,
            cartTotal: cost,
            productQuantities: productQuantities
          });
        });
      }
    } else {
      this.setState({
        products: [],
        cartTotal: 0,
        productQuantities: []
      });
    } 
  };

  componentDidMount(): void {
    this.getTheCart();
  }

  handleCallback = (subtotal: number, productQuantity: ProductQuantity): void => {    
    const grandTotal = this.state.cartTotal += subtotal;
    this.state.productQuantities.forEach((item) => {
      this.state.products?.forEach((product) => {
        if (item.productId === product.id) {
          item.quantity = productQuantity.quantity;
        }
      })
    } )
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
        <PlaceOrderModal
                user = {this.props.user}
                products= {products}
                cartTotal= {parseFloat(this.state.cartTotal.toFixed(2))}
                title="Checkout"
              >Checkout</PlaceOrderModal>
      </div>
    )
  }
}

export default Cart;
