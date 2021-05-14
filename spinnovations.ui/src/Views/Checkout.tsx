import React, { Component } from "react";
import { Payment } from "../Helpers/Interfaces/PaymentInterfaces";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import paymentData from "../Helpers/Data/PaymentData";
import { getCardCompany } from "../Components/Cards/PaymentInfoCard";
import { Product } from "../Helpers/Interfaces/ProductInterfaces";
import { CheckoutProps } from "../Helpers/Interfaces/CheckoutInterfaces";
import {Table, Button} from 'reactstrap';
import orderData from "../Helpers/Data/orderData";

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
  placeOrder = () => {
    const order = {
      Customer_Id : this.state.user.id,
      Payment_Info_Id: parseInt(this.state.selectedPayment),
      Address: this.state.user.address,
      City: this.state.user.city,
      State: this.state.user.state,
      Country: this.state.user.country,
      Postal_Code: this.state.user.postal_Code
    }
    orderData.placeNewOrder(order).then((response) => {
      this.state.products.forEach((product) => {
        console.log(response);
        console.log(product);
        const orderDetails = {
          Order_Id: response.id,
          Product_Id: product.id,
          Unit_Price: product.unit_Price,
          Quantity: 1,
          Shipped: false,
        }
        orderData.placeNewOrderDetails(orderDetails);
      })
        
      
    });
  }

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
                  name="selectedPayment"
                  value={this.state.selectedPayment}
                  onChange={this.handleChange}
                  required
                >
                  <option value='' selected disabled hidden>Test</option>
                  {options}
                </select>
              </form>
            </div>
          </div>
        </div>
        <Button onClick={()=> this.placeOrder()}>Place Order</Button>
      </div>
    );
  }
}
export default Checkout;
