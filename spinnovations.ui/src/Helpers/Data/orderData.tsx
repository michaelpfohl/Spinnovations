import axios from 'axios';
import { rejects } from 'node:assert';
import {BaseURL} from '../config.json';

const ordersUrl = `${BaseURL}/orders`;

interface Order {
    id: number;
    Customer_Id: number;
    Order_Date: Date;
    Address: string;
    City: string;
    Country: String;
    Postal_Code: String;
}

const GetAllOrders: Promise<[Order]> = () => new Promise((resolve, reject) =>
    axios
        .get(ordersUrl).then(response => resolve(response.data))

    ).catch((error => rejects(error))

export default GetAllOrders;