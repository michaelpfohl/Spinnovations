import axios from 'axios';
import {BaseURL} from '../config.json';

const ordersUrl = `${BaseURL}/order`;

export interface Order {
    id: number;
    customer_Id: number;
    order_Date: Date;
    address: string;
    city: string;
    country: string;
    postal_Code: string;
}

const getAllOrders = (): Promise<Order[]> => new Promise((resolve, reject) => {
    axios.get(`${ordersUrl}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getOrderById = (orderId: number): Promise<Order> => new Promise((resolve, reject) => {
    axios.get(`${ordersUrl}/${orderId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getOrderDetailsByOrderId = (orderDetailsId: number): Promise<Order

const orderData = {
    getAllOrders,
    getOrderById
}

export default orderData;