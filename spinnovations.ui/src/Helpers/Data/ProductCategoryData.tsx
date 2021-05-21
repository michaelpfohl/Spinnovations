import { BaseURL } from '../config.json';
import { ProductCategory, CategoryTotals } from '../Interfaces/ProductCategoryInterfaces';
import axios from 'axios';

const ProductCategoryURL = `${BaseURL}/Product_Category`

const getProductCategories = (): Promise<ProductCategory[]> => new Promise((resolve, reject) => {
    axios.get(`${ProductCategoryURL}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getAllProductCategoriesWithProducts = (): Promise<ProductCategory[]> => new Promise((resolve, reject) => {
    axios.get(`${ProductCategoryURL}/With_Products`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const getQuantityByCategory = (creatorId: number): Promise<CategoryTotals[]> => new Promise((resolve, reject) => {
    axios.get(`${ProductCategoryURL}/totals/${creatorId}`).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
});

const productCategoryData = { getProductCategories, getAllProductCategoriesWithProducts, getQuantityByCategory };

export default productCategoryData;
