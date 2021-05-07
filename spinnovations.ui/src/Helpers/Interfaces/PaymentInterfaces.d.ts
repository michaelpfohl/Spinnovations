declare module 'PaymentTypes' {
    interface Payment {
        id: number;
        card_Number: string;
        expiration_Month: number;
        card_Company: string;
        expiration_Year: number;
        CVV: number;
        customer_Id: number;
    }
    interface PaymentProps {
        payment: Payment,
        location: RouteComponentProps["location"],
        user: User,
    }
    interface PaymentInfoFormProps  {
        user: User;
        payment?: Payment;
        onUpdate?: () => void;
      };
}

export { Payment, PaymentProps, PaymentInfoFormProps }