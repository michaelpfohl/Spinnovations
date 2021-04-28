import { OrderDetails, OrderProps, Order } from '../../Helpers/Interfaces/OrderInterfaces';

const calcOrderTotal = ({ order }: Order): number => {
    let totalCost = 0;
    console.log(order);
    order.order_Details.forEach(function (detail: OrderDetails) {
        totalCost += detail.unit_Price; 
    });
    return totalCost;
}

export const OrderCard = ({ order }: OrderProps): JSX.Element => 
    <div className="order-card" key={Math.random()+order.id}>
        {console.log(order)}
        <p>ORDER DATE: {order.order_Date}</p>
        {/* <p>TOTAL AMOUNT: ${calcOrderTotal(order)}</p> */}
        <p>ADDRESS: {order.address}, {order.city} {order.country} {order.postal_code}</p>
        <p>PRODUCT: {order.products[0].name}</p>
    </div>