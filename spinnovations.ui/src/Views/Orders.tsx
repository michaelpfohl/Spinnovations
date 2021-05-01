import React, { Component } from "react";
import { Order } from "../Helpers/Interfaces/OrderInterfaces";
import orderData from "../Helpers/Data/orderData";
import { OrderCard } from "../Components/Cards/OrderCard";
import { Table } from "reactstrap";

class Orders extends Component {
  state = {
    orders: [],
  };

  componentDidMount(): void {
    orderData.getAllUserOrders(4).then((response: Order[]) => {
      this.setState({
        orders: response,
      });
    });
  }
  render(): JSX.Element {
    const { orders } = this.state;
    const orderCard = (order: Order): JSX.Element => {
      return <OrderCard order={order} />;
    };
    const cards = orders.map(orderCard);
    return (
      <div>
          <h1>Orders</h1>
        <Table hover>
          <thead>
            <tr>
              <th scope="row"></th>
              <th>Order Date</th>
              <th>Address</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {cards}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Orders;
