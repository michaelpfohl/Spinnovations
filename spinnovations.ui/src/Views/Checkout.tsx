import React, { Component } from "react";
import { Payment } from "../Helpers/Interfaces/PaymentInterfaces";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import paymentData from "../Helpers/Data/PaymentData";
import { getCardCompany } from "../Components/Cards/PaymentInfoCard";
import userData from "../Helpers/Data/userData";

type CheckoutState = {
  paymentMethods: Payment[];
  user: User;
  selectedPayment: Payment;
};

class Checkout extends Component<any> {
  state: CheckoutState = {
    paymentMethods: [],
    user: {},
    selectedPayment: {},
  };
  componentDidMount(): void {
    userData.getUserById(5).then((response: User) => {
      this.setState({
        user: response,
      });
      paymentData
        .getUserPayments(this.state.user.id)
        .then((response: Payment[]) => {
          this.setState({
            paymentMethods: response,
          });
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
    const { paymentMethods, user } = this.state;
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
    const options = paymentMethods.map(paymentOptions);
    return (
      <div>
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
