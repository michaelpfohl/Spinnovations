import React, { Component } from "react";
import { Payment } from "../Helpers/Interfaces/PaymentInterfaces";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import paymentData from "../Helpers/Data/PaymentData";
import { getCardCompany } from "../Components/Cards/PaymentInfoCard";
import { Product } from "../Helpers/Interfaces/ProductInterfaces";
import { CheckoutProps } from "../Helpers/Interfaces/CheckoutInterfaces";
import {Table} from 'reactstrap';

type CheckoutState = {
  payments: Payment[];
  products: Product[];
  user: User;
  selectedPayment: Payment;
};

class Checkout extends Component<CheckoutProps> {
  state: CheckoutState = {
    payments: [],
    user: this.props.location.state.user,
    selectedPayment: {},
    products: this.props.location.state.products,
  };
  componentDidMount(): void {
    paymentData
      .getUserPayments(this.state.user.id)
      .then((response: Payment[]) => {
        this.setState({
          payments: response,
        });
      });
  }
  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render(): JSX.Element {
    const { payments, user } = this.state;
    const paymentOptions = (payment: Payment): JSX.Element => {
      const last4 = payment.card_Number.substring(
        payment.card_Number.length - 4,
        payment.card_Number.length
      );
      return (
        <option key={payment.id}>
          {getCardCompany(payment)}: xxx{last4}
        </option>
      );
    };
    const options = payments.map(paymentOptions);
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th scope="row"></th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
        <div className="d-flex justify-content-center mt-5">
          <div className="product-form-container p-3">
            <h1 className="product-form-header">Select Payment Method</h1>
            <div className="d-flex justify-content-center">
              <form className="add-Product-form">
                <select
                  className="form-control form-group"
                  name="expiration_Month"
                  value={this.state.selectedPayment}
                  onChange={this.handleChange}
                  required
                >
                  {options}
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Checkout;
