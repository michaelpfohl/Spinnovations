import React from 'react';
import { ProductProps } from "../../Helpers/Interfaces/ProductInterfaces";

type cartCardState = {
  qty: number,
  itemSubTotal: number,
  greetingColor: number,
};

class CartCard extends React.Component<ProductProps> {
  state: cartCardState = {
    qty: 1,
    itemSubTotal: this.props.product.price,
    greetingColor: 0,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, price: number): void => {
    const quantityDesired = parseInt(e.target.value);
    const subtotal = quantityDesired * price;
    const change = subtotal - this.state.itemSubTotal;
    const cleanSubtotal = parseFloat(subtotal.toFixed(2));
    this.setState({
      qty: quantityDesired,
      itemSubTotal: cleanSubtotal,
    })
    this.props.parentCallback(change);
  }

  componentDidMount(): void {
    this.setState({ greetingColor: Math.floor(Math.random() * 7) + 1 })
  }

  render(): JSX.Element {
    const { product, remove } = this.props;
    const { itemSubTotal, greetingColor } = this.state;
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className={`cart-table-container col-10 color-border-${greetingColor}`}>
          <h1 className={`mt-4 mb-4 color-text-${greetingColor} underline`}>
            {product.name}
          </h1>
          <table className={`cart-table mb-4 color-half-border-${greetingColor}`}>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row"><img src={product.imageUrl} className={`profile-photo m-4 color-border-${greetingColor}`}></img></td>
                <td>{product.price}</td>
                <td><input id='quantity' onChange={(e) => this.handleInputChange(e, product.price)} type='number' min='1' max={product.quantity_In_Stock} placeholder='1' value={this.state.qty} /></td>
                <td>{itemSubTotal}</td>
                <td><button className='style-button bg-scheme-red' onClick={() => { remove(product, this.state.qty); }}>Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default CartCard;
