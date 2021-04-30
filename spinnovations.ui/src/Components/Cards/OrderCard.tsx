import { OrderDetails, OrderProps, Order } from '../../Helpers/Interfaces/OrderInterfaces';

const calcOrderTotal = ({ order }: Order): number => {
    let totalCost = 0;
    console.log(order);
    order.order_Details.forEach(function (detail: OrderDetails) {
        totalCost += detail.unit_Price; 
    });
    return totalCost;
}

export const OrderCard = ({ order }: OrderProps): JSX.Element => {
  return (
    <div className="order-row" key={Math.random()+order.id}>
        <tr>
          <th scope='row'></th>
          <td>{order.order_Date}</td>
          <td>{order.address}, {order.city} {order.country} {order.postal_code}</td>
          <td>$$$</td>
        </tr>
    </div>
  );
}