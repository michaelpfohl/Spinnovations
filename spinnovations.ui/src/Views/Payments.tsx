import React, { Component } from 'react';

import paymentsData, { Payment } from '../Helpers/Data/PaymentData';
import {User} from '../Helpers/Interfaces/UserInterfaces';

type PaymentState = {
    user: User,
    payments: Payment[]
}

class Payments extends Component {
    state: PaymentState = {
        user: this.props.location.state.user,
        payments: [],
    };

    componentDidMount(): void {
        paymentsData.getPayments().then((response: Payment[]) => {
            this.setState({
                payments: response
            })
        });
    }
    render() : JSX.Element {
        const { payments } = this.state
        const paymentCard = (payment: Payment) => {
            return (
                <div key={payment.id}>
                    <h1>{payment.card_Number}</h1>
                    <h2>{payment.expiration_Month}</h2>
                    <h2>{payment.expiration_Year}</h2>
                    <h2>{payment.cvv}</h2>
                    <h2>{payment.card_Company}</h2>
                </div>
            )
        }

        console.log("payments", payments)
        const cards = payments.map(paymentCard)
        return (
            <div>
                {cards}
            </div>
        )
    }
}

export default Payments;
