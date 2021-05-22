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
  greetingColor: number
}

export default class OrderDetailsCard extends React.Component<OrderDetailsCardProps> {
  state: OrderDetailsCardState = {
    sellerInfo: null,
    greetingColor: 0
  }
  componentDidMount(): void {
    
    userData.getUserById(this.props.product.creator_Id).then((response: User) => {
        this.setState(
          {
            sellerInfo: response,
            greetingColor: Math.floor(Math.random() * 7) + 1
        })
    })
  }
  render(): JSX.Element {
    const {product, order_Details} = this.props;
    const {sellerInfo, greetingColor} = this.state;
    return (
      <>
        <tr>
          <th scope="row"></th>
          <td>
            <img className={`order-image color-border-${greetingColor}`} src={product.imageUrl} alt={product.name}></img>
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
