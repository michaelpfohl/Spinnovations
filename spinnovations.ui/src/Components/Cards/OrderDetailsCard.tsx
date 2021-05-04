import React from 'react';
import {OrderDetails} from "../../Helpers/Interfaces/OrderInterfaces";
import {Product} from '../../Helpers/Interfaces/ProductInterfaces';
import userData from "../../Helpers/Data/userData";
import {User} from '../../Helpers/Interfaces/UserInterfaces';

type OrderDetailsCardProps = {
    order_Details : OrderDetails,
    product : Product,
}

type OrderDetailsCardState = {
  sellerInfo: User,
}

export default class OrderDetailsCard extends React.Component<OrderDetailsCardProps> {
  state: OrderDetailsCardState = {
    sellerInfo: null
  }
  componentDidMount(): void {
    userData.getUserById(this.props.product.creator_Id).then((response: User) => {
        this.setState({sellerInfo: response})
    })
  }
  render(): JSX.Element {
    const {product, order_Details} = this.props;
    const {sellerInfo} = this.state;
    return (
      <>
        <tr>
          <th scope="row"></th>
          <td>
            <img src={product.imageUrl} alt={product.name} height='50'></img>
          </td>
          <td>{product.name}</td>
          <td>{sellerInfo?.display_Name}</td>
          <td>{product.price}</td>
          <td>{order_Details.quantity}</td>
        </tr>
      </>
    );
  }
}
