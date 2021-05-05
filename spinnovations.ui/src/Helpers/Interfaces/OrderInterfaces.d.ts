declare module 'OrderTypes' {
    interface Order {
        id: number;
        customer_Id: number;
        order_Date: Date;
        address: string;
        city: string;
        country: string;
        postal_Code: string;
        order_Details: Array<OrderDetails>;
        products: Array<Products>;
    }
    interface OrderDetails {
        id: number;
        order_Id: number;
        product_Id: number;
        unit_Price: number;
        quantity: number;
    }
    interface OrderProps {
        order: Order;
        user: User;
        location: RouteComponentProps["location"];
    }
    interface OrderDetailsProps{
        orderDetailsProps: OrderDetails;
    }
}

export { Order, OrderProps, OrderDetails, OrderDetailsProps }