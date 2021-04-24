import React, { Component } from 'react';

import productData from '../Helpers/Data/ProductData';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import { ProductCard } from '../Components/Cards/ProductCard';

class Products extends Component {
    state = {
        products: [],
    };

    componentDidMount(): void {
        productData.getProducts().then((response: Product[]) => {
            this.setState({
                products: response
            })
        });
    }
    render() : JSX.Element {
        const { products } = this.state
        const productCard = (product: Product): JSX.Element => {
            return (<ProductCard product={product}/>)
        }

        const cards = products.map(productCard)
        return (
            <div>
                {cards}
            </div>
        )
    }
}

export default Products;
