import {
  OrderProps,OrderDetails
} from "../../Helpers/Interfaces/OrderInterfaces";
import {Product} from '../../Helpers/Interfaces/ProductInterfaces';

type OrderDetailsCardProps = {
    order_Details : OrderDetails,
    product : Product,
}

export const OrderDetailsCard = ({ order_Details, product }: OrderDetailsCardProps): JSX.Element => {
  return (
    <>
      <tr>
        <th scope="row"></th>
        <td>
          <img src={product.imageUrl} alt={product.name} height='50'></img>
        </td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{order_Details.quantity}</td>
      </tr>
    </>
  );
};
