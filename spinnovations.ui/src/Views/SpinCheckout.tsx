import React, { Component } from "react";
import { Payment } from "../Helpers/Interfaces/PaymentInterfaces";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import paymentData from "../Helpers/Data/PaymentData";
import { getCardCompany } from "../Components/Cards/PaymentInfoCard";
import { CheckoutProps } from "../Helpers/Interfaces/CheckoutInterfaces";
import { withRouter } from "react-router-dom";

type CheckoutState = {
    payments: Payment[];
    user: User;
    selectedPayment: Payment;
    spinTotal: number;
    success: boolean;
    error: boolean;
};

class Checkout extends Component<CheckoutProps> {
    state: CheckoutState = {
        payments: [],
        user: this.props.user,
        selectedPayment: {},
        spinTotal: this.props.spinTotal,
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

    placeOrder(): void {
        const order = {
            Customer_Id: this.state.user.id,
            Payment_Info_Id: parseInt(this.state.selectedPayment),
        };
        if (isNaN(order.Payment_Info_Id)) {
            this.setState({
                error: true,
            });
        } else {
            this.setState({
                success: true,
            })
            setTimeout(() => {
                this.props.callback();
              }, 1000);
        }
    }

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

                        </form>
                    </div>
                    <h4>Total: ${this.state.spinTotal.toFixed(2)}</h4>
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
