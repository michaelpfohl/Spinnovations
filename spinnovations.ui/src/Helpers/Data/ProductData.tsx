import axios from 'axios';
import { BaseURL } from '../config.json';
import { Product } from '../Interfaces/ProductInterfaces';

const productsURL = `${BaseURL}/Products`;

const getProducts = (): Promise<Product[]> => new Promise((resolve, reject) => {
    axios.get(`${productsURL}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getProductsByUserId = (creatorId: number): Promise<Product[]> => new Promise((resolve, reject) => {
    axios.get(`${productsURL}/seller/${creatorId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
})

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

const addNewProduct = (product: Product): Promise<Product> => new Promise((resolve, reject) => {
    axios.post(`${productsURL}`, product).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const deleteProduct = (productId: number): Promise<void> => axios.delete(`${productsURL}/${productId}`)

const updateProduct = (product: Product): Promise<void> => axios.put(`${productsURL}/${product.id}`, product);

const productData = {
    getProducts,
    getProductsByUserId,
    getLastTwentyProducts,
    addNewProduct,
    getProduct,
    deleteProduct,
    updateProduct,
}

export default productData;
