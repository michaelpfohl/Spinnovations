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

const orderData = {
    getAllOrders
}

export default orderData;