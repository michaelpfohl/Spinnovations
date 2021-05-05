import React, { Component } from 'react';
import PaymentInfoCard from '../Components/Cards/PaymentInfoCard';
import paymentData from '../Helpers/Data/PaymentData';
import {PaymentProps, Payment} from '../Helpers/Interfaces/PaymentInterfaces';
import {User} from '../Helpers/Interfaces/UserInterfaces';

type PaymentState = {
    user: User,
    payments: Payment[]
}

class Payments extends Component<PaymentProps> {
    state: PaymentState = {
        user: this.props.location.state.user,
        payments: [],
    };

    componentDidMount(): void {
        paymentData.getUserPayments(this.state.user.id).then((response: Payment[]) => {
            console.log(response);
            this.setState({
                payments: response
            })
        });
    }
    render() : JSX.Element {
        const { payments } = this.state
        const paymentCard = (payment: Payment): JSX.Element => {
            return <PaymentInfoCard payment={payment}/>
        };

        const cards = payments.map(paymentCard)
        return (
            <div>
                <h1>Payment Info</h1>
                {cards}
            </div>
        )
    }
}

export default Payments;
