import { OrderDetails, OrderProps } from '../../Helpers/Interfaces/OrderInterfaces';

const calcOrderTotal = ({ order }: OrderProps): number => {
    let totalCost = 0;
    order.order_Details.forEach(function (detail: OrderDetails) {
        totalCost += detail.unit_Price 
    });
    return totalCost;
}

export const OrderCard = ({ order }: OrderProps): JSX.Element => 
    <div className="order-card" key={order.id}>
        <p>ORDER DATE: {order.order_Date}</p>
        <p>TOTAL AMOUNT: ${order.order_Details[0].unit_Price}</p>
        <p>ADDRESS: {order.address}, {order.city} {order.country} {order.postal_code}</p>
        <p>PRODUCT: {order.products[0].name}</p>
    </div>