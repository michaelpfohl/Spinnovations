import React from "react";
import { ProductProps } from "../../Helpers/Interfaces/ProductInterfaces";

type cartCardState = {
  qty: number;
  itemSubTotal: number;
  greetingColor: number;
  spinQty: number,
};

class CartCard extends React.Component<ProductProps> {
  state: cartCardState = {
    qty: 1,
    itemSubTotal: this.props.product.price,
    greetingColor: 0,
    spinQty: 1,
  };

  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    price: number
  ): void => {
    const quantityDesired = parseInt(e.target.value);
    const subtotal = quantityDesired * price;
    const change = subtotal - this.state.itemSubTotal;
    const cleanSubtotal = parseFloat(subtotal.toFixed(2));
    this.setState({
      qty: quantityDesired,
      itemSubTotal: cleanSubtotal,
    });
    this.props.parentCallback(change, {
      productId: this.props.product.id,
      quantity: parseInt(e.target.value),
    });
  };

  componentDidMount(): void {
    this.setState({ greetingColor: Math.floor(Math.random() * 7) + 1 });
  }

  render(): JSX.Element {
    const { product, remove } = this.props;
    const { itemSubTotal, greetingColor } = this.state;
    return (
      <tbody>
        <tr>
          <td scope="row">
              <img
                src={product.imageUrl}
                className={`profile-photo m-3 color-border-${greetingColor}`}
              ></img>
          </td>
          <td>{product.name}</td>
          <td>${product.price}</td>
          <td>
            {itemSubTotal !== 0 && (
              <input
                id="quantity"
                onChange={(e) => this.handleInputChange(e, product.price)}
                type="number"
                min="1"
                max={product.quantity_In_Stock}
                placeholder="1"
                value={this.state.qty}
              />
            )}
            {itemSubTotal === 0 && (
              <p className="mb-0">{this.state.qty}</p>
            )}
          </td>
          <td>${itemSubTotal}</td>
          <td>
            {itemSubTotal !== 0 && (
              <button
                className="style-button bg-scheme-red"
                onClick={() => {
                  remove(product, this.state.qty);
                }}
              >
                Remove
              </button>
            )}
            {itemSubTotal === 0 && (
              <i className="fas fa-cog fa-lg spinning-cog scheme-add-green"></i>
            )}
          </td>
        </tr>
      </tbody>
    );
  }
}
export default CartCard;
