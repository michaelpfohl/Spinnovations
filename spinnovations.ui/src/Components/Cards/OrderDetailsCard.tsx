import React, {useState} from 'react';
import {OrderDetails} from "../../Helpers/Interfaces/OrderInterfaces";
import {Product} from '../../Helpers/Interfaces/ProductInterfaces';
import userData from "../../Helpers/Data/userData";
import {User} from '../../Helpers/Interfaces/UserInterfaces';

type OrderDetailsCardProps = {
    order_Details : OrderDetails,
    product : Product,
}

export const OrderDetailsCard = ({ order_Details, product }: OrderDetailsCardProps): JSX.Element => {
  const [sellerName, getSellerName] = React.useState("");
  React.useEffect(() => {
    const getSellerInfo = async (sellerId: number) => {
      const response = await userData.getUserById(sellerId);
      const {sellerName } = await response.display_Name;
      getSellerName(sellerName);
      };
  });
  return (
    <>
      <tr>
        <th scope="row"></th>
        <td>
          <img src={product.imageUrl} alt={product.name} height='50'></img>
        </td>
        <td>{product.name}</td>
        <td>{sellerName}</td>
        <td>{product.price}</td>
        <td>{order_Details.quantity}</td>
      </tr>
    </>
  );
};
