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
        selectedItem: '',
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
