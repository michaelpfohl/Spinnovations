import {
  OrderDetails,
  OrderProps,
} from "../../Helpers/Interfaces/OrderInterfaces";
import OrderDetailsModal from "../Modals/OrderDetailsModal";
import orderData from "../../Helpers/Data/orderData";

export const OrderCard = ({ order, shipped, onUpdate, seller }: OrderProps): JSX.Element => {
  const calcOrderTotal = (order: OrderProps): number => {
    let totalCost = 0;
    order?.order_Details.forEach(function (detail: OrderDetails) {
      totalCost += detail.unit_Price * detail.quantity;
    });
    return parseFloat(totalCost.toFixed(2));
  };
  const cleanUpDate = (order: OrderProps): string => {
    const dateSplit = order.order_Date.split("T");
    return dateSplit[0];
  }

  const ship = () => {
    order.order_Details[0].shipped = true;
    orderData.markOrderAsShipped(order.order_Details[0]).then(() => {
      onUpdate();
    })
  }

  return (
    <>
      <tr>
        <th scope="row"></th>
        <td>{cleanUpDate(order)}</td>
        <td>
          {order.address}, {order.city}, {order.state} {order.country} {order.postal_code}
        </td>
        <td>${calcOrderTotal(order)}</td>
        <td>
          <OrderDetailsModal title={'Order Details'} buttonLabel={'See Details'} order={order}/>
        </td>
        { seller && !shipped && 
          <td>
            <button id={order.order_Details[0].id} className="style-button bg-scheme-green" onClick={ship}>Ship</button>
          </td>
        }
      </tr>
    </>
  );
};
