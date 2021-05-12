import React, { Component } from "react";
import orderData from "../Helpers/Data/orderData";
import productCategoryData from "../Helpers/Data/ProductCategoryData";
import { Order, OrderProps } from "../Helpers/Interfaces/OrderInterfaces";
import { OrderCard } from "../Components/Cards/OrderCard";
import { Table } from "reactstrap";
import { CategoryTotals } from "../Helpers/Interfaces/ProductCategoryInterfaces";

class Sales extends Component<OrderProps> {
  state = {
    shipped: [],
    toBeShipped: [],
    user: this.props.location.state.user,
    greetingColor: 0,
    totalSales: 0,
    last30: 0,
    averagePrice: 0,
    quantityByCategory: [],
  };

  componentDidMount(): void {
    orderData.getSalesShipped(this.state.user.id).then((response: Order[]) => {
      this.setState({
        shipped: response,
      });
    });
    orderData.getSalesNotYetShipped(this.state.user.id).then((response: Order[]) => {
      this.setState({
        toBeShipped: response,
      });
    });
    orderData.getTotalUserSales(this.state.user.id).then((response: number) => {
      this.setState({
        totalSales: response,
      });
    });
    orderData
      .getAverageProductSoldPrice(this.state.user.id)
      .then((response: number) => {
        this.setState({
          averagePrice: response,
        });
      });
    orderData
      .getTotalUserSalesLastMonth(this.state.user.id)
      .then((response: number) => {
        this.setState({
          last30: response,
        });
      });
    productCategoryData
      .getQuantityByCategory(this.state.user.id)
      .then((response: CategoryTotals) => {
        this.setState({
          quantityByCategory: response,
        });
      });
    this.setState({ greetingColor: Math.floor(Math.random() * 7) + 1 });
  }

  onUpdate = (): void => {
    this.componentDidMount();
  }

  render(): JSX.Element {
    const {
      shipped,
      toBeShipped,
      greetingColor,
      totalSales,
      averagePrice,
      last30,
      quantityByCategory
    } = this.state;
    const orderCard = (order: Order): JSX.Element => {
      return <OrderCard key={order.id} order={order} onUpdate={this.onUpdate} shipped={order.order_Details[0].shipped}/>;
    };
    const yesShipped = shipped.map(orderCard);
    const notShipped = toBeShipped.map(orderCard);
    const categoryTotalsDivs = (categoryTotal: CategoryTotals): JSX.Element => (
        <div key={categoryTotal.name}>
            {categoryTotal.name}: {categoryTotal.total}
        </div>
    )
    const categoryTotals = quantityByCategory.map(categoryTotalsDivs);
    return (
      <div>
        <div className="d-flex justify-content-center mt-5">
          <div
            className={`sales-dashboard col-10 color-border-${greetingColor}`}
          >
            <h1 className={`mt-4 mb-4 color-text-${greetingColor} underline`}>
              Sales Dashboard
            </h1>
            <div className="d-flex justify-content-around">
              <p>Total Lifetime Sales: ${totalSales.toFixed(2)}</p>
              <p>Last Month Sales: ${last30.toFixed(2)}</p>
              <p>Average Product Sale Price: ${averagePrice.toFixed(2)}</p>
            </div>
            <h4 className={`mt-4 mb-4 color-text-${greetingColor} underline`}>
              Inventory by Category
            </h4>
            <div className="d-flex justify-content-around mt-4 mb-4">
              {categoryTotals}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <div
            className={`sales-table-container col-10 color-border-${greetingColor}`}
          >
            <h1 className={`mt-4 mb-4 color-text-${greetingColor} underline`}>
              To Be Shipped
            </h1>
            <div className="container">
              <Table
                className={`sales-table mb-4 color-half-border-${greetingColor}`}
                hover
              >
                <thead>
                  <tr>
                    <th scope="row"></th>
                    <th>Order Date</th>
                    <th>Address</th>
                    <th>Total Cost</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{notShipped}</tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5 mb-5">
          <div
            className={`sales-table-container col-10 color-border-${greetingColor}`}
          >
            <h1 className={`mt-4 mb-4 color-text-${greetingColor} underline`}>
              Shipped
            </h1>
            <div className="container">
              <Table
                className={`sales-table mb-4 color-half-border-${greetingColor}`}
                hover
              >
                <thead>
                  <tr>
                    <th scope="row"></th>
                    <th>Order Date</th>
                    <th>Address</th>
                    <th>Total Cost</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{yesShipped}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sales;
