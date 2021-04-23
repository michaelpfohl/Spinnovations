import axios from 'axios';
import { BaseURL } from '../config.json';

const productsURL = `${BaseURL}/Products`;

export type Product = {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    category_Id: number;
    price: number;
    creator_Id: number;
    quantity_In_Stock: number;
}

const getProducts = (): Promise<Product[]> => new Promise((resolve, reject) => {
    axios.get(`${productsURL}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const productData = {
    getProducts
}

export default productData;
