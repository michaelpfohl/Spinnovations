import axios from 'axios';
import { BaseURL } from '../config.json';
import { Product } from '../Interfaces/ProductInterfaces';

const productsURL = `${BaseURL}/Products`;

const getProducts = (): Promise<Product[]> => new Promise((resolve, reject) => {
    axios.get(`${productsURL}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getLastTwentyProducts = (): Promise<Product[]> => new Promise((resolve, reject) => {
    axios.get(`${productsURL}/last20`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getProduct = (productId : number): Promise<Product> => new Promise((resolve, reject) => {
    axios.get(`${productsURL}/${productId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
})

const productData = {
    getProducts,
    getLastTwentyProducts,
    getProduct
}

export default productData;
