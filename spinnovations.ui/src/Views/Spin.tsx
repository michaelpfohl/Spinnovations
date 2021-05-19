import React from 'react';
import { User } from "../Helpers/Interfaces/UserInterfaces";
import { ProductCategoryBar } from '../Components/ProductCategoryBar';
import productCategoryData from '../Helpers/Data/ProductCategoryData';
import productData from '../Helpers/Data/ProductData';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import { ProductCategory } from '../Helpers/Interfaces/ProductCategoryInterfaces';
import BuySpinModal from '../Components/Modals/BuySpinModal';
import Wheel from '../Components/Wheel';

type UserProps = {
    user: User;
  };

class Spin extends React.Component<UserProps> {

    state = {
        products: [],
        filteredProducts: [],
        categories: [],
        spinTotal: 0.99,
        isAllowed: false,
    };

    componentDidMount(): void {
        productCategoryData.getProductCategories().then((response: ProductCategory[]) => {
            this.setState({
                categories: response
            })
        });
        productData.getProducts().then((response: Product[]) => {
            this.setState({
                products: response,
                filteredProducts: response,
            })
        });
    }

    filterByCategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const category = e.target.id;
        const { products } = this.state;
        const filteredProducts = products?.filter((product: Product) => product.category_Id == category);
        this.setState({ filteredProducts });
    }

    filterAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let { filteredProducts } = this.state;
        const { products } = this.state;
        if (e.target.id == "all-products") {
            filteredProducts = products;
            this.setState({ filteredProducts });
        }
    }

    render(): JSX.Element {
        const { categories, filteredProducts, isAllowed } = this.state;
        return (
            <>
                {isAllowed === true ? (
                    <>
                        <Wheel products={filteredProducts} />
                    </>
                ) : (
                    <>
                        <ProductCategoryBar categories={categories} filter={this.filterByCategory} all={this.filterAll} />
                        <BuySpinModal
                            user={this.props.user}
                            products={filteredProducts}
                            title="Buy A Spin"
                            spinTotal={this.state.spinTotal}
                        ></BuySpinModal>
                    </>
                )}
            </>
        )
    }
}

export default Spin;
