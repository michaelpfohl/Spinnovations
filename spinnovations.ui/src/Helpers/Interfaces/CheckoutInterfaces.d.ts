import { RouteComponentProps } from "react-router";

declare module 'CheckoutTypes' {
    interface CheckoutProps {
        user: User;
        products: Array<Product>;
        payments: Array<Payment>;
        cartTotal: number;
        location: RouteComponentProps["location"];
    }
}
export {CheckoutProps}
