import React, { Component } from "react";
import paymentData from "../../Helpers/Data/PaymentData";
import {PaymentInfoFormProps} from '../../Helpers/Interfaces/PaymentInterfaces';

class PaymentInfoForm extends Component<PaymentInfoFormProps> {
  state = {
    id: this.props.payment?.id || null,
    card_Number: this.props.payment?.card_Number || "",
    expiration_Month: this.props.payment?.expiration_Month || "",
    card_Company: this.props.payment?.card_Company || "",
    expiration_Year: this.props.payment?.expiration_Year || "",
    cvv: this.props.payment?.cvv || "",
    customer_Id: this.props.payment?.customer_Id || "",
    added: false,
    error: false,
    updated: false,
    errorMessageCard: "",
    errorMessageCVV: "",
    errorMessageExp: "",
  };

  componentDidMount(): void {
    this.setState({ customer_Id: this.props.user?.id });
  }

  validateCard(): boolean {
    switch (this.state.card_Company) {
      case ('1') : {
        if(this.state.card_Number.length !== 15) {
          this.setState({
            errorMessageCard : "Card number should be 15 digits long"
          })
          return false;
        } else if (this.state.card_Number[0] !== '3') {
          this.setState({
            errorMessageCard : "Card number should begin with 3"
          })
          return false;
        }else {
          return true;
        }
      }
      case ('2') : {
        if(this.state.card_Number.length !== 16) {
          this.setState({
            errorMessageCard : "Card number should be 16 digits long"
          })
          return false;
        } else if (this.state.card_Number[0] !== '6') {
          this.setState({
            errorMessageCard : "Card number should begin with 6"
          })
          return false;
        }else {
          return true;
        }
      }
      case ('3') : {
        if(this.state.card_Number.length !== 16) {
          this.setState({
            errorMessageCard : "Card number should be 16 digits long"
          })
          return false;
        } else if (this.state.card_Number[0] !== '5') {
          this.setState({
            errorMessageCard : "Card number should begin with 5"
          })
          return false;
        }else {
          return true;
        }
      }
      case ('4') : {
        if(this.state.card_Number.length !== 16) {
          this.setState({
            errorMessageCard : "Card number should be 16 digits long"
          })
          return false;
        } else if (this.state.card_Number[0] !== '4') {
          this.setState({
            errorMessageCard : "Card number should begin with 4"
          })
          return false;
        }else {
          return true;
        }
      }
      default : {
        return false;
      }
    }
  }

  validateCVV(): boolean {
    if (this.state.card_Company === "1" && this.state.cvv.length !== 4) {
      this.setState({
        errorMessageCVV: "Please enter a valid 4 digit CVV"
      })
      return false;
    } else if (this.state.card_Company !== "1" && this.state.cvv.length !== 3) {
      this.setState({
        errorMessageCVV: "Please enter a valid 3 digit CVV"
      })
      return false;
    } else {
      this.setState({
        errorMessageCVV: ""
      })
      return true;
    }
  }
  validateExp(): boolean {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    if (parseInt(this.state.expiration_Year) < currentYear) {
      this.setState({
        errorMessageExp: 'This Card Has Expired'
      })
      return false;
    } else if ((parseInt(this.state.expiration_Year) === currentYear) && (parseInt(this.state.expiration_Month) < currentMonth)) {
      this.setState({
        errorMessageExp: 'This Card Has Expired'
      })
      return false;
    } else {
      this.setState({
        errorMessageExp: ""
      })
      return true;
    }
  }

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessageCard: "",
      errorMessageCVV: "",
      errorMessageExp: "",
    });
  };

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const payment = {
      card_Number: this.state.card_Number,
      expiration_Month: this.state.expiration_Month,
      card_Company: this.state.card_Company,
      expiration_Year: this.state.expiration_Year,
      cvv: this.state.cvv,
      customer_Id: this.state.customer_Id,
    };
    if ((this.validateCard()) && (this.validateCVV()) && (this.validateExp())) {
      if (this.state.id === null) {
        paymentData.addPayment(payment).then(() => {
          this.props.onUpdate();
          this.setState({
            added: true,
            error: false,
            errorMessageCard: "",
            errorMessageCVV: ""
            
          });
          setTimeout(() => this.setState({added: false}), 3000);
        })
      } else {
        const payment = {
          id: this.state.id,
          card_Number: this.state.card_Number,
          expiration_Month: this.state.expiration_Month,
          card_Company: this.state.card_Company,
          expiration_Year: this.state.expiration_Year,
          cvv: this.state.cvv,
          customer_Id: Number(this.state.customer_Id),
        };
        paymentData.updatePayment(payment).then(()=> {
          this.setState({
            updated: true
          })
          if (this.props.onUpdate){
            this.props.onUpdate();
          }
          setTimeout(() => this.setState({updated: false}), 3000);
        })
      }
    } else {
      this.setState({
        error: true,
      });
      setTimeout(() => this.setState({error: false}), 3500);
    }
  };

  render(): JSX.Element {
    const { added, error, errorMessageCard, errorMessageCVV, errorMessageExp, updated } = this.state;
    return (
      <div>
        {added && 
        <div>
          <div className="product-added-container mb-5 mt-5">
            <h2>Payment Added!</h2>
          </div>
        </div>
        }
        {updated && 
        <div>
          <div className="product-added-container mb-5 mt-5">
            <h2>Payment Updated!</h2>
          </div>
        </div>
        }
        {error &&
        <div>
          <div className="product-added-container mb-5 mt-5">
            <p>{errorMessageCard}</p>
            <p>{errorMessageCVV}</p>
            <p>{errorMessageExp}</p>
          </div>
        </div>
        }
        <div className="d-flex justify-content-center mt-5">
          <div className="product-form-container p-3">
            <h1 className="product-form-header">Enter Card Information</h1>
            <div className="d-flex justify-content-center">
              <form onSubmit={this.handleSubmit} className="add-Product-form">
                <div className="form-group">
                  <input
                    type="string"
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
                    name="cvv"
                    value={this.state.cvv}
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
                      <option value="" selected disabled hidden>
                        Select a Month
                      </option>
                      <option value={'1'}>
                        Jan
                      </option>
                      <option value={'2'}>
                        Feb
                      </option>
                      <option value={'3'}>
                        Mar
                      </option>
                      <option value={'4'}>
                        Apr
                      </option>
                      <option value={'5'}>
                        May
                      </option>
                      <option value={'6'}>
                        Jun
                      </option>
                      <option value={'7'}>
                        Jul
                      </option>
                      <option value={'8'}>
                        Aug
                      </option>
                      <option value={'9'}>
                        Sep
                      </option>
                      <option value={'10'}>
                        Oct
                      </option>
                      <option value={'11'}>
                        Nov
                      </option>
                      <option value={'12'}>
                        Dec
                      </option>
                    </select>
                  <select
                    className="form-control form-group"
                    name="expiration_Year"
                    value={this.state.expiration_Year}
                    onChange={this.handleChange}
                    required
                  >
                      <option value="" selected disabled hidden>
                        Select a Year
                      </option>
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
                      <option value={'2026'}>
                        2026
                      </option>
                      <option value={'2027'}>
                        2027
                      </option>
                      <option value={'2028'}>
                        2028
                      </option>
                      <option value={'2029'}>
                        2029
                      </option>
                      <option value={'2030'}>
                        2030
                      </option>
                </select>
                  <select
                    className="form-control form-group"
                    name="card_Company"
                    value={this.state.card_Company}
                    onChange={this.handleChange}
                    required
                  >
                      <option value="" selected disabled hidden>
                        Select a Card Company
                      </option>
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
