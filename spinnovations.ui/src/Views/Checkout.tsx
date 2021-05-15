import React, { Component } from "react";
import { Payment } from "../Helpers/Interfaces/PaymentInterfaces";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import paymentData from "../Helpers/Data/PaymentData";
import { getCardCompany } from "../Components/Cards/PaymentInfoCard";
import { Product } from "../Helpers/Interfaces/ProductInterfaces";
import { CheckoutProps } from "../Helpers/Interfaces/CheckoutInterfaces";
import { Table, Button } from "reactstrap";
import orderData from "../Helpers/Data/orderData";

type CheckoutState = {
  payments: Payment[];
  products: Product[];
  user: User;
  selectedPayment: Payment;
  cartTotal: number;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingCountry: string;
  shippingPostalCode: string;
  success: boolean;
};

class Checkout extends Component<CheckoutProps> {
  state: CheckoutState = {
    payments: [],
    user: this.props.user,
    selectedPayment: {},
    products: this.props.products,
    cartTotal: this.props.cartTotal,
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    shippingPostalCode: "",
    success: false,
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
  placeOrder = () => {
    const order = {
      Customer_Id: this.state.user.id,
      Payment_Info_Id: parseInt(this.state.selectedPayment),
      Address: this.state.shippingAddress,
      City: this.state.shippingCity,
      State: this.state.shippingState,
      Country: this.state.shippingCountry,
      Postal_Code: this.state.shippingPostalCode,
    };
    orderData.placeNewOrder(order).then((response) => {
      orderData
        .getMostRecentUserOrder(response.customer_Id)
        .then((recentOrderResponse) => {
          this.state.products.forEach((product) => {
            const orderDetails = {
              Order_Id: recentOrderResponse.id,
              Product_Id: product.id,
              Unit_Price: product.price,
              Quantity: 1,
              Shipped: false,
            };
            orderData.placeNewOrderDetails(orderDetails);
          });
          this.setState({
            success: true,
          });
        });
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
        <option key={payment.id} value={payment.id}>
          {getCardCompany(payment)}: xxx{last4}
        </option>
      );
    };
    const options = payments.map(paymentOptions);
    return (
      <div>
        {this.state.success && (
          <div>
            <div className="product-added-container mb-5 mt-5">
              <h1>Thank you for your order!</h1>
            </div>
          </div>
        )}
        <div className="d-flex flex-column align-items-center p-3">
          <h1 className={`product-form-header`}>Checkout</h1>
          <div className="product-form-container p-3">
            <form className="add-Product-form">
              <h4 className="product-form-header m-3">Select Payment Method</h4>
              <select
                className="form-control-lg m2 modal-input"
                name="selectedPayment"
                value={this.state.selectedPayment}
                onChange={this.handleChange}
                required
              >
                <option value="" selected disabled hidden>
                  Test
                </option>
                {options}
              </select>
              <h4 className="product-form-header m-3">Set Shipping Address</h4>
              <div>
                <input
                  type="text"
                  name="shippingAddress"
                  value={this.state.shippingAddress}
                  onChange={this.handleChange}
                  placeholder="Address"
                  className={`form-control-lg m-2 modal-input`}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="shippingCity"
                  value={this.state.shippingCity}
                  onChange={this.handleChange}
                  placeholder="City"
                  className={`form-control-lg m-2 modal-input`}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="shippingState"
                  value={this.state.shippingState}
                  onChange={this.handleChange}
                  placeholder="State"
                  className={`form-control-lg m-2 modal-input`}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="shippingCountry"
                  value={this.state.shippingCountry}
                  onChange={this.handleChange}
                  placeholder="Country"
                  className={`form-control-lg m-2 modal-input`}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="shippingPostalCode"
                  value={this.state.shippingPostalCode}
                  onChange={this.handleChange}
                  placeholder="Postal Code"
                  className={`form-control-lg m-2 modal-input`}
                  required
                />
              </div>
            </form>
          </div>
          <h4>Total: ${this.state.cartTotal}</h4>
          <button
            className="style-button m-4 bg-scheme-green"
            onClick={() => this.placeOrder()}
          >
            Place Order
          </button>
        </div>
      </div>
    );
  }
}
export default Checkout;
