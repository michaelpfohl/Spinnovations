import React from 'react';

import productData from '../Helpers/Data/ProductData';
import productCategoryData from '../Helpers/Data/ProductCategoryData';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import { ProductCard } from '../Components/Cards/ProductCard';
import { ProductCategory } from '../Helpers/Interfaces/ProductCategoryInterfaces';
import { ProductCategoryBar } from '../Components/ProductCategoryBar';

type ProductsState = {
    products?: Product[],
    filteredProducts?: Product[],
    categories?: ProductCategory[]
}

class Products extends React.Component<ProductsState> {

    state: ProductsState = {
        products: [],
        filteredProducts: [],
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

    filterByCategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const category = e.target.id;
        const { products } = this.state;
        const filteredProducts = products?.filter((product) => product.category_Id == category);
        this.setState({ filteredProducts });
    }

    render() : JSX.Element {
        const { products, categories } = this.state
        console.log(this.state);
        const productCard = (product: Product): JSX.Element => {
            return (<ProductCard product={product}/>)
        }
        const cards = products?.map(productCard)
        
        return (
            <div>
                <ProductCategoryBar categories={categories}/>
                {cards}
            </div>
        )
    }
}

export default Products;
