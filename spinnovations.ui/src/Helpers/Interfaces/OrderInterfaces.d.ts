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
    interface OrderDetails {
        id: number;
        order_Id: number;
        product_Id: number;
        unit_Price: number;
        quantity: number;
    }
    interface OrderProps {
        order: Order
    }
    interface OrderDetailsProps{
        orderDetailsProps: OrderDetailsProps
    }
}

export { Order, OrderProps, OrderDetails, OrderDetailsProps }