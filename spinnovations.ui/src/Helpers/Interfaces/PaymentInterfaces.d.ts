declare module 'PaymentTypes' {
    interface Payment {
        id: number;
        Card_Number: string;
        Expiration_Month: number;
        Card_Company: string;
        Expiration_Year: number;
        CVV: number;
        Customer_Id: number;
    }
    interface PaymentProps {
        payment: Payment,
        location: RouteComponentProps["location"],
        user: User,
    }
}

export { Payment, PaymentProps }