import {
    OrderDetails,
    OrderProps,
  } from "../../Helpers/Interfaces/OrderInterfaces";
  
  export const OrderCard = ({ order }: OrderProps): JSX.Element => {
    return (
      <>
        <tr>
          <th scope="row"></th>
          <td>{order.order_Date}</td>
          <td>
            {order.address}, {order.city} {order.country} {order.postal_code}
          </td>
        </tr>
      </>
    );
  };