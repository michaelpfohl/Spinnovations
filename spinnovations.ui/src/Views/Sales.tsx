import React, { Component } from "react";
import orderData from "../Helpers/Data/orderData";
import { Order, OrderProps } from "../Helpers/Interfaces/OrderInterfaces";
import { OrderCard } from "../Components/Cards/OrderCard";
import { Table } from "reactstrap";

class Sales extends Component<OrderProps> {
  state = {
    orders: [],
    user: this.props.location.state.user,
    greetingColor: 0,
  };

  componentDidMount(): void {
    console.log(this.state.user.id);
    orderData.getAllUserSales(this.state.user.id).then((response: Order[]) => {
      this.setState({
        orders: response,
      });
    });
    this.setState({ greetingColor: Math.floor(Math.random() * 7) + 1})
  }
  render(): JSX.Element {
    const { orders, greetingColor } = this.state;
    const orderCard = (order: Order): JSX.Element => {
      return <OrderCard order={order} />;
    };
    const cards = orders.map(orderCard);
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className={`sales-table-container col-10 color-border-${greetingColor}`}>
          <h1 className={`mt-4 mb-4 color-text-${greetingColor} underline`}>Sales</h1>
          <div className="container">
            <Table className="sales-table mb-4" hover>
              <thead>
                <tr>
                  <th scope="row"></th>
                  <th>Order Date</th>
                  <th>Address</th>
                  <th>Total Cost</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{cards}</tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Sales;
