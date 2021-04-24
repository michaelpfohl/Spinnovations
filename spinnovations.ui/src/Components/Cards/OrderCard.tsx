import { OrderProps } from '../../Helpers/Interfaces/OrderInterfaces';

export const OrderCard = ({ order }: OrderProps): JSX.Element => 
    <div className="order-card" key={order.id}>
        <img src={order.imageUrl}/>
        <h1>{order.name}</h1>
        <p>{order.description}</p>
        <h3>${order.price}</h3>
        <h3>Quantity In Stock: {order.quantity_In_Stock}</h3>
    </div>