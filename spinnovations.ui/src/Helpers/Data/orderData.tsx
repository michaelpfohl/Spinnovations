import axios from 'axios';
import config from '../config';
import {Order, OrderDetails, OrderToPlace} from '../Interfaces/OrderInterfaces'

const ordersUrl = `${config.BaseURL}/order`;
const orderDetailsUrl = `${config.BaseURL}/Order_Details`;
const productsUrl = `${config.BaseURL}/Products`;

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

const markOrderAsShipped = (orderDetails: OrderDetails): Promise<OrderDetails> => axios({
    method: 'PUT',
    url: `${orderDetailsUrl}/${orderDetails.id}`, 
    data: JSON.stringify(orderDetails), 
    headers:{'Content-Type': 'application/json; charset=utf-8'}
});

const getAllUserOrders = (customerId: number): Promise<Order> => new Promise((resolve, reject) => {
    axios.get(`${ordersUrl}/user/${customerId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getAllUserSales = (creatorId: number): Promise<Order[]> => new Promise((resolve, reject) => {
    axios.get(`${ordersUrl}/sales/${creatorId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getSalesShipped = (creatorId: number): Promise<Order[]> => new Promise((resolve, reject) => {
    axios.get(`${ordersUrl}/shipped/${creatorId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getSalesNotYetShipped = (creatorId: number): Promise<Order[]> => new Promise((resolve, reject) => {
    axios.get(`${ordersUrl}/to-be-shipped/${creatorId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getTotalUserSales = (creatorId: number): Promise<number> => new Promise((resolve, reject) => {
    axios.get(`${ordersUrl}/sales/total/${creatorId}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
})

const getAverageProductSoldPrice = (creatorId: number): Promise<number> => new Promise((resolve, reject) => {
    axios.get(`${ordersUrl}/sales/average/${creatorId}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
})

const getTotalUserSalesLastMonth = (creatorId: number): Promise<number> => new Promise((resolve, reject) => {
    axios.get(`${ordersUrl}/sales/last30/${creatorId}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
})

const placeNewOrder = (order: OrderToPlace): Promise<Order> => new Promise((resolve, reject) => {
    axios.post(`${ordersUrl}`, order).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
})

const placeNewOrderDetails = (orderDetails: OrderDetails): Promise<OrderDetails> => new  Promise((resolve, reject) => {
    const placeNewOrder = axios.post(`${orderDetailsUrl}`, orderDetails);
    const decrementProduct = axios.put(`${productsUrl}/decrementQuantity`, orderDetails); 

    axios.all([placeNewOrder, decrementProduct]).then(axios.spread((...responses) => {
        resolve(responses[0].data);
        resolve(responses[1].data);
    })).catch((errors) => reject(errors));
})

const getMostRecentUserOrder = (customerId: number) : Promise<Order> => new  Promise((resolve, reject) => {
    axios.get(`${ordersUrl}/user/last/${customerId}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
})

const orderData = {
    getAllOrders,
    getOrderById,
    getOrderDetailsById,
    getAllUserOrders,
    getAllUserSales,
    getTotalUserSales,
    getAverageProductSoldPrice,
    getTotalUserSalesLastMonth,
    getSalesShipped,
    getSalesNotYetShipped,
    markOrderAsShipped,
    placeNewOrder,
    placeNewOrderDetails,
    getMostRecentUserOrder
}

export default orderData;