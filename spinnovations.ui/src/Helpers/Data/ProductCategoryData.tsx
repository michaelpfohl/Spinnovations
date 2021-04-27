import { BaseURL } from '../config.json';
import { ProductCategory } from '../Interfaces/ProductCategoryInterfaces';
import axios from 'axios';

const ProductCategoryURL = `${BaseURL}/Product_Category`

const getProductCategories = (): Promise<ProductCategory[]> => new Promise((resolve, reject) => {
    axios.get(`${ProductCategoryURL}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

export default {
    getProductCategories
}
