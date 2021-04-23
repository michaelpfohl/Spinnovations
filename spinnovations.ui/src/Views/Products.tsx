import React, { Component } from 'react';

import productData, { Product } from '../Helpers/Data/ProductData';
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
            return (
                <ProductCard 
                    id={product.id} 
                    name={product.name} 
                    description={product.description}
                    imageUrl={product.imageUrl}
                    creator_Id={product.creator_Id}
                    category_Id={product.category_Id}
                    price={product.price}
                    quantity_In_Stock={product.quantity_In_Stock}
                />
            )
        }

        console.log("products", products)
        const cards = products.map(productCard)
        return (
            <div>
                {cards}
            </div>
        )
    }
}

export default Products;
