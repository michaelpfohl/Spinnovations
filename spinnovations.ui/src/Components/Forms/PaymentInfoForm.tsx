import React, { Component } from "react";
import { User } from "../../Helpers/Interfaces/UserInterfaces";
import { Payment } from "../../Helpers/Interfaces/PaymentInterfaces";
import paymentData from "../../Helpers/Data/PaymentData";
import {PaymentInfoFormProps} from '../../Helpers/Interfaces/PaymentInterfaces';

class PaymentInfoForm extends Component<PaymentInfoFormProps> {
  state = {
    id: this.props.payment?.id || null,
    card_Number: this.props.payment?.card_Number || "",
    expiration_Month: this.props.payment?.expiration_Month || "",
    card_Company: this.props.payment?.card_Company || "",
    expiration_Year: this.props.payment?.expiration_Year || "",
    CVV: this.props.payment?.CVV || "",
    customer_Id: this.props.payment?.customer_Id || "",
    added: false,
  };

  componentDidMount(): void {
    this.setState({ customer_Id: this.props.user?.id });
  }

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const payment = {
      card_Number: this.state.card_Number,
      expiration_Month: this.state.expiration_Month,
      card_Company: this.state.card_Company,
      expiration_Year: this.state.expiration_Year,
      CVV: this.state.CVV,
      customer_Id: this.state.customer_Id,
    };
    if (this.state.id === null) {
      paymentData.addPayment(payment);
      this.setState({
        added: true,
      });
      this.props.onUpdate();
      setTimeout(() => this.setState({added: false}), 3000);
    } else {
      const payment = {
        card_Number: this.state.card_Number,
        expiration_Month: this.state.expiration_Month,
        card_Company: Number(this.state.card_Company),
        expiration_Year: this.state.expiration_Year,
        CVV: this.state.CVV,
        customer_Id: Number(this.state.customer_Id),
      };
      paymentData.updatePayment(payment).then(()=> {
        if (this.props.onUpdate){
          this.props.onUpdate();
        }
      })
    }
  };

  render(): JSX.Element {
    const { added } = this.state;
    return (
      <div>
        {added && 
        <div>
          <div className="product-added-container mb-5 mt-5">
            <h1>Payment Added!</h1>
          </div>
        </div>
        }
        <div className="d-flex justify-content-center mt-5">
          <div className="product-form-container p-3">
            <h1 className="product-form-header">Add A New Card</h1>
            <div className="d-flex justify-content-center">
              <form onSubmit={this.handleSubmit} className="add-Product-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="card_Number"
                    value={this.state.card_Number}
                    onChange={this.handleChange}
                    placeholder="Card Number"
                    className="form-control form-control-lg m-2 modal-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="CVV"
                    value={this.state.CVV}
                    onChange={this.handleChange}
                    placeholder="CVV"
                    className="form-control form-control-lg m-2 modal-input"
                    required
                  />
                </div>
                  <select
                    className="form-control form-group"
                    name="expiration_Month"
                    value={this.state.expiration_Month}
                    onChange={this.handleChange}
                    required
                  >
                      <option value={'01'}>
                        Jan
                      </option>
                      <option value={'02'}>
                        Feb
                      </option>
                      <option value={'03'}>
                        Mar
                      </option>
                      <option value={'04'}>
                        Apr
                      </option>
                      <option value={'05'}>
                        May
                      </option>
                      <option value={'06'}>
                        Jun
                      </option>
                      <option value={'07'}>
                        Jul
                      </option>
                      <option value={'08'}>
                        Aug
                      </option>
                    </select>
                  <select
                    className="form-control form-group"
                    name="expiration_Year"
                    value={this.state.expiration_Year}
                    onChange={this.handleChange}
                    required
                  >
                      <option value={'2021'}>
                        2021
                      </option>
                      <option value={'2022'}>
                        2022
                      </option>
                      <option value={'2023'}>
                        2023
                      </option>
                      <option value={'2024'}>
                        2024
                      </option>
                      <option value={'2025'}>
                        2025
                      </option>
                </select>
                  <select
                    className="form-control form-group"
                    name="card_Company"
                    value={this.state.card_Company}
                    onChange={this.handleChange}
                    required
                  >
                      <option value={1}>
                        American Express
                      </option>
                      <option value={2}>
                        Discover
                      </option>
                      <option value={3}>
                        Mastercard
                      </option>
                      <option value={4}>
                        Visa
                      </option>
                </select>
                <button className="btn btn-success form-button form-button-text mt-1 mb-1">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentInfoForm;
