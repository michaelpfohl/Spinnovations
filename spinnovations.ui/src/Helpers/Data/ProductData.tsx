import axios from 'axios';
import { BaseURL } from '../config.json';
import { Product } from '../Interfaces/ProductInterface';

const productsURL = `${BaseURL}/Products`;

const getProducts = (): Promise<Product[]> => new Promise((resolve, reject) => {
    axios.get(`${productsURL}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const productData = {
    getProducts
}

export default productData;
