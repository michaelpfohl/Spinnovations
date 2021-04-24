import axios from 'axios';
import {BaseURL} from '../config.json';
import {Order, OrderDetails} from '../Interfaces/OrderInterfaces'

const ordersUrl = `${BaseURL}/order`;
const orderDetailsUrl = `${BaseURL}/Order_Details`;

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

const getOrderDetailsById = (orderDetailsId: number): Promise<OrderDetails> => new Promise((resolve, reject) => {
    axios.get(`${orderDetailsUrl}/${orderDetailsId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getAllUserOrders = (customerId: number): Promise<Order> => new Promise((resolve, reject) => {
    axios.get(`${ordersUrl}/user/${customerId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const orderData = {
    getAllOrders,
    getOrderById,
    getOrderDetailsById,
    getAllUserOrders
}

export default orderData;