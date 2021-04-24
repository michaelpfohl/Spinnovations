import { OrderProps } from '../../Helpers/Interfaces/OrderInterfaces';

export const OrderCard = ({ order }: OrderProps): JSX.Element => 
    <div className="order-card" key={order.id}>
        <p>ORDER ID: {order.id}</p>
        <p>CUSTOMER ID: {order.customer_Id}</p>
        <p>ADDRESS: {order.address}, {order.city} {order.country} {order.postal_code}</p>
    </div>