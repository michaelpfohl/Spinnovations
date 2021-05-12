import React from 'react';
import { ProductProps } from "../../Helpers/Interfaces/ProductInterfaces";

type cartCardState = {
  qty: number,
  itemSubTotal: number,
};

class CartCard extends React.Component<ProductProps> {
  state: cartCardState = {
    qty: 1,
    itemSubTotal: this.props.product.price,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, price: number): void =>{
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

  render(): JSX.Element {
    const { product, remove } = this.props;
    const { itemSubTotal } = this.state;
    return (
    <tr>
      <th scope="row"><img src={product.imageUrl}></img></th>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td><input id='quantity' onChange={(e) => this.handleInputChange(e, product.price)} type='number' min='1' max={product.quantity_In_Stock} placeholder='1' value={this.state.qty}/></td>
      <td>{itemSubTotal}</td>
      <td><button onClick={ () => { remove(product.name); } }>Remove</button></td>
    </tr>
    )
  }
}
export default CartCard;
