import React, { Component } from 'react';

import productData from '../Helpers/Data/ProductData';
import productCategoryData from '../Helpers/Data/ProductCategoryData';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import { ProductCard } from '../Components/Cards/ProductCard';
import { ProductCategory } from '../Helpers/Interfaces/ProductCategoryInterfaces';
import { ProductCategoryBar } from '../Components/ProductCategoryBar';

class Products extends Component {
    state = {
        products: [],
        categories: []
    };

    componentDidMount(): void {
        productCategoryData.getProductCategories().then((response: ProductCategory[]) => {
            this.setState({
                categories: response
            })
        });
        productData.getProducts().then((response: Product[]) => {
            this.setState({
                products: response
            })
        });
    }
    render() : JSX.Element {
        const { products, categories } = this.state
        const productCard = (product: Product): JSX.Element => {
            return (<ProductCard product={product}/>)
        }
        const cards = products.map(productCard)
        console.log("state", categories);
        return (
            <div>
                <ProductCategoryBar categories={categories}/>
                {cards}
            </div>
        )
    }
}

export default Products;
