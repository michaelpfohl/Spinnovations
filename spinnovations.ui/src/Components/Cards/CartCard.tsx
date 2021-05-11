import React from 'react';
import { ProductProps } from "../../Helpers/Interfaces/ProductInterfaces";

type cartCardState = {
  qty: number,
};

class CartCard extends React.Component<ProductProps> {
  state: cartCardState = {
    qty: 1,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>{
    let quantityDesired = parseInt(e.target.value); 
    this.setState({
      qty: quantityDesired,
    })
  }

  handleSubtotal = (price: number): number => {
    const quantity = this.state.qty;
    const subtotal = quantity * price;
    const roundedSubtotal = parseFloat(subtotal.toFixed(2));
    this.props.parentCallback(roundedSubtotal);
    return roundedSubtotal;
  }

  render(): JSX.Element {
    const { product } = this.props;
    return (
  <tr>
      <th scope="row"><img src={product.imageUrl}></img></th>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td><input id='quantity' onChange={this.handleInputChange} type='number' min='1' max={product.quantity_In_Stock} placeholder='1' value={this.state.qty}/></td>
      <td>{this.handleSubtotal(product.price)}</td>
    </tr>
    )
}
}
export default CartCard;
