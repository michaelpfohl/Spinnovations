import React, { Component } from 'react';

import productData, { Product } from '../Helpers/Data/ProductData';

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
        const productCard = (product: Product) => {
            return (
                <div key={product.id}>
                    <h1>{product.name}</h1>
                </div>
            )
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
