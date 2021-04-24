declare module 'OrderTypes' {
    interface Order {
        id: number;
        customer_Id: number;
        order_Date: Date;
        address: string;
        city: string;
        country: string;
        postal_Code: string;
    }
    interface OrderProps {
        order: Order
    }
}

export { Order, OrderProps }