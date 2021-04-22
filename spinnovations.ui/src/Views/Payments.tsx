import React from "react";
import paymentData from "../Helpers/Data/paymentData";

class Payments extends React.Component {

    state = {
        payments: []
    };

    componentDidMount() {
        paymentData.GetAllPayments()
            .then(data => this.setState({ payments:data }));
    }

    render(): JSX.Element {
        const {payments} = this.state;

        console.log("payments", payments);

        const PaymentCard = (payment) => {
           return (
                <div>
                    {payment.Card_Number}
                </div>
            )
        };

        const cards = payments.map(PaymentCard);
        console.log("cards",cards);

        return (
            <>
            <h2>Cards Of Customers</h2>
            {cards}
            </>
        )
    }
}

export default Payments;