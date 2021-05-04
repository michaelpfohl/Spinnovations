import {
  OrderDetails,
  OrderProps,
} from "../../Helpers/Interfaces/OrderInterfaces";
import OrderDetailsModal from "../Modals/OrderDetailsModal";


export const OrderCard = ({ order }: OrderProps): JSX.Element => {
  const calcOrderTotal = (order: OrderProps): number => {
    let totalCost = 0;
    order?.order_Details.forEach(function (detail: OrderDetails) {
      totalCost += detail.unit_Price * detail.quantity;
    });
    return totalCost;
  };
  const cleanUpDate = (order: OrderProps): string => {
    const dateSplit = order.order_Date.split("T");
    return dateSplit[0];
  }
  return (
    <>
      <tr>
        <th scope="row"></th>
        <td>{cleanUpDate(order)}</td>
        <td>
          {order.address}, {order.city} {order.country} {order.postal_code}
        </td>
        <td>${calcOrderTotal(order)}</td>
        <td>
          <OrderDetailsModal title={'Order Details'} buttonLabel={'See Details'} order={order}/>
        </td>
      </tr>
    </>
  );
};
