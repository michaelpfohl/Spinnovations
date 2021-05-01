import {
  OrderDetails,
  OrderProps,
} from "../../Helpers/Interfaces/OrderInterfaces";
import OrderDetailsModal from "../Modals/OrderDetailsModal";

export const OrderCard = ({ order }: OrderProps): JSX.Element => {
  const calcOrderTotal = (order: OrderProps): number => {
    let totalCost = 0;
    order?.order_Details.forEach(function (detail: OrderDetails) {
      totalCost += detail.unit_Price;
    });
    return totalCost;
  };
  return (
    <>
      <tr>
        <th scope="row"></th>
        <td>{order.order_Date}</td>
        <td>
          {order.address}, {order.city} {order.country} {order.postal_code}
        </td>
        <td>${calcOrderTotal(order)}</td>
        <td>
          <OrderDetailsModal title={'Order Details'} buttonLabel={'See Details'}>
              
          </OrderDetailsModal>
        </td>
      </tr>
    </>
  );
};
