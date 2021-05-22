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
        spinTotal: 31.99,
        isAllowed: false,
        selectedItem: '',
        selectedCategory: '' || 'all products',
    };

    componentDidMount(): void {
        productCategoryData.getAllProductCategoriesWithProducts().then((response: ProductCategory[]) => {
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
        const { products, categories } = this.state;
        const filteredProducts: Product[] = products?.filter((product: Product) => product.category_Id == category);
        const selectedCategory: ProductCategory[] = categories?.filter((p: ProductCategory) => p.id == category)

        let total = 1;
        for (let i = 0; i < filteredProducts.length; i++) {
            total += filteredProducts[i].price;
        }
        const spinTotal = ((total + (total * 0.1)) / filteredProducts.length);
        console.warn(spinTotal);
        this.setState({
            filteredProducts,
            selectedCategory: selectedCategory[0].category_Name,
            spinTotal: spinTotal,
        });
    }


    filterAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let { filteredProducts } = this.state;
        const { products } = this.state;
        if (e.target.id == "all-products") {
            let total = 1;
            products.forEach((product: Product) => {
                total += product.price;
            })
            const spinTotal = ((total + (total * 0.1)) / products.length);
            filteredProducts = products;
            this.setState({
                filteredProducts,
                selectedCategory: 'all products',
                spinTotal: spinTotal,
            });
        }
    }

    handleCallback = (itemName: string): void => {
        if (this.state.isAllowed === false) {
            this.setState({
                isAllowed: true,
            })
        } else {
            this.setState({
                isAllowed: false,
                selectedItem: itemName,
            })
        }
    }

    render(): JSX.Element {
        const { categories, filteredProducts, isAllowed, selectedItem } = this.state;
        return (
            <>
                {isAllowed === true ? (
                    <>
                        <Wheel products={filteredProducts} callback={this.handleCallback} />
                    </>
                ) : (
                    <>
                        <ProductCategoryBar categories={categories} filter={this.filterByCategory} all={this.filterAll} />
                        {selectedItem.length > 0 && (
                            <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                          >
                            <strong>{selectedItem} added to cart!</strong> Visit the cart page to check out!
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                              onClick={() => this.setState({ selectedItem: '' })}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                        )}
                        <BuySpinModal
                            callback={this.handleCallback}
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
