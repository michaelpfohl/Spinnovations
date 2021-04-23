import React, { Component } from 'react';

import orderData, { Order } from '../Helpers/Data/orderData';

class Orders extends Component {
    state = {
        orders: [],
    };

    componentDidMount(): void {
        orderData.getAllOrders().then((response: Order[]) => {
            this.setState({
                orders: response
            })
        });
    }
    render() : JSX.Element {
        const { orders } = this.state
        const orderCard = (order: Order) => {
            return (
                <div key={order.id}>
                    <h1>{order.customer_Id}</h1>
                </div>
            )
        }

        console.log("Orders", orders)
        const cards = orders.map(orderCard)
        return (
            <div>
                <h2>Orders Customer Ids</h2>
                {cards}
            </div>
        )
    }
}

export default Orders;
