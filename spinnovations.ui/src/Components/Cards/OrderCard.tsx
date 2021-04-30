import { OrderDetails, OrderProps, Order } from '../../Helpers/Interfaces/OrderInterfaces';

const calcOrderTotal = ({ order }: Order): number => {
    let totalCost = 0;
    console.log(order);
    order.order_Details.forEach(function (detail: OrderDetails) {
        totalCost += detail.unit_Price; 
    });
    return totalCost;
}

 => 
    <div className="order-card" key={Math.random()+order.id}>
        {console.log(order)}
        <p>ORDER DATE: {order.order_Date}</p>
        {/* <p>TOTAL AMOUNT: ${calcOrderTotal(order)}</p> */}
        <p>ADDRESS: {order.address}, {order.city} {order.country} {order.postal_code}</p>
        <p>PRODUCT: {order.products[0].name}</p>
    </div>


import React from 'react';
import { Table } from 'reactstrap';

export const OrderCard = ({ order }: OrderProps): JSX.Element => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Order Date</th>
          <th>Price</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Example;