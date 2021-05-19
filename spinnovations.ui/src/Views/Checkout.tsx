import React, { Component } from "react";
import { Payment } from "../Helpers/Interfaces/PaymentInterfaces";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import paymentData from "../Helpers/Data/PaymentData";
import { getCardCompany } from "../Components/Cards/PaymentInfoCard";
import { Product } from "../Helpers/Interfaces/ProductInterfaces";
import {
  CheckoutProps,
  ProductQuantity,
} from "../Helpers/Interfaces/CheckoutInterfaces";
import orderData from "../Helpers/Data/orderData";
import { withRouter } from "react-router-dom";

type CheckoutState = {
  payments: Payment[];
  products: Product[];
  productQuantities: ProductQuantity[];
  user: User;
  selectedPayment: Payment;
  cartTotal: number;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingCountry: string;
  shippingPostalCode: string;
  success: boolean;
  error: boolean;
};

class Checkout extends Component<CheckoutProps> {
  state: CheckoutState = {
    payments: [],
    user: this.props.user,
    selectedPayment: {},
    products: this.props.products,
    productQuantities: this.props.productQuantities,
    cartTotal: this.props.cartTotal,
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    shippingPostalCode: "",
    success: false,
    error: false,
  };

  componentDidMount(): void {
    const activePayments: Payment[] = [];
    paymentData
      .getUserPayments(this.state.user.id)
      .then((response: Payment[]) => {
        response.forEach((payment) => {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1;
          const currentYear = currentDate.getFullYear();
          if (
            parseInt(payment.expiration_Year) > currentYear ||
            (parseInt(payment.expiration_Year) === currentYear &&
              parseInt(payment.expiration_Month) >= currentMonth)
          ) {
            activePayments.push(payment)
          }
        });
        this.setState({
          payments: activePayments,
        });
      });
  }
  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    this.setState({
      [e.target.name]: e.target.value,
      error: false,
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
    if (isNaN(order.Payment_Info_Id)) {
      this.setState({
        error: true,
      });
    } else {
      orderData.placeNewOrder(order).then((response) => {
        orderData
          .getMostRecentUserOrder(response.customer_Id)
          .then((recentOrderResponse) => {
            this.state.products.forEach((product) => {
              this.state.productQuantities.forEach((qty) => {
                if (product.id === qty.productId) {
                  const orderDetails = {
                    Order_Id: recentOrderResponse.id,
                    Product_Id: product.id,
                    Unit_Price: product.price,
                    Quantity: qty.quantity,
                    Shipped: false,
                  };
                  orderData.placeNewOrderDetails(orderDetails);
                }
              });
            });
            this.setState({
              success: true,
            });
          });
      });
      localStorage.clear();
      setTimeout(() => {
        this.props.history.push("/orders", { user: this.state.user });
      }, 2000);
    }
  };

  render(): JSX.Element {
    const { payments } = this.state;
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
        {this.state.error && (
          <div>
            <div className="product-added-container mb-5 mt-5">
              <p>Please select a payment method!</p>
            </div>
          </div>
        )}
        <div className="d-flex flex-column align-items-center p-3">
          <h1 className={`product-form-header`}>Checkout</h1>
          <div className="product-form-container p-3">
            <form className="add-Product-form">
              <h4 className="product-form-header m-3">Select Payment Method</h4>
              <div className="form-group">
                <select
                  className="form-control-lg m2 modal-input"
                  name="selectedPayment"
                  value={this.state.selectedPayment}
                  onChange={this.handleChange}
                  required
                >
                  <option key={0} value="" selected>
                    Select A Card
                  </option>
                  {options}
                </select>
              </div>
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
export default withRouter(Checkout);
