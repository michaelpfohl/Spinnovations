import React, { Component } from "react";
import { Order } from "../Helpers/Interfaces/OrderInterfaces";
import orderData from "../Helpers/Data/orderData";
import { OrderCard } from "../Components/Cards/OrderCard";
import { Table } from "reactstrap";
import {User} from '../Helpers/Interfaces/UserInterfaces';
import {OrderProps} from '../Helpers/Interfaces/OrderInterfaces';

type OrderState = {
  orders: Orders[],
  user: User;
  greetingColor: number,
}

class Orders extends Component<OrderProps> {
  state : OrderState = {
    orders: [],
    user: this.props.location.state.user,
    greetingColor: 0,
  };

  componentDidMount(): void {
    orderData.getAllUserOrders(this.state.user.id).then((response: Order[]) => {
      this.setState({
        orders: response,
      });
    });
    this.setState({ greetingColor: Math.floor(Math.random() * 7) + 1 });
  }
  render(): JSX.Element {
    const { orders, greetingColor } = this.state;
    const orderCard = (order: Order): JSX.Element => {
      return <OrderCard order={order} />;
    };
    const cards = orders.map(orderCard);
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className={`col-10 color-border-${greetingColor} orders-dashboard`}>
        <h1 className="mt-4 mb-4">My Orders</h1>
        <Table className={`color-half-border-${greetingColor} mb-4 orders-table`}hover>
          <thead>
            <tr>
              <th scope="row"></th>
              <th>Order Date</th>
              <th>Address</th>
              <th>Total Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cards}
          </tbody>
        </Table>
        </div>
      </div>
    );
  }
}

export default Orders;
