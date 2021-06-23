import React from "react";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import { ProductCategoryBar } from "../Components/ProductCategoryBar";
import productCategoryData from "../Helpers/Data/ProductCategoryData";
import productData from "../Helpers/Data/ProductData";
import { Product } from "../Helpers/Interfaces/ProductInterfaces";
import { ProductCategory } from "../Helpers/Interfaces/ProductCategoryInterfaces";
import BuySpinModal from "../Components/Modals/BuySpinModal";
import Wheel from "../Components/Wheel";

type SpinState = {
  products: Product[];
  filteredProducts: Product[];
  categories: ProductCategory[];
  spinTotal: number;
  isAllowed: boolean;
  selectedItem: string;
  selectedCategory: string;
};

type UserProps = {
  user: User;
};

class Spin extends React.Component<UserProps> {
  state: SpinState = {
    products: [],
    filteredProducts: [],
    categories: [],
    spinTotal: 0,
    isAllowed: false,
    selectedItem: "",
    selectedCategory: "" || "All Products",
  };

  componentDidMount(): void {
    productCategoryData
      .getAllProductCategoriesWithProducts()
      .then((response: ProductCategory[]) => {
        this.setState({
          categories: response,
        });
      });

    productData.getProducts().then((response: Product[]) => {
      let total = 0;
      response.forEach((product) => {
        total += product.price;
      });
      const spinTotal = (total + total * 0.1) / response.length;
      this.setState({
        products: response,
        filteredProducts: response,
        spinTotal,
      });
    });
  }

  filterByCategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const category = e.target.id;
    const { products, categories } = this.state;

    const keys = Object.keys(localStorage);
    const productsInCart: Product[] = [];
    if (localStorage.length) {
      for (const key of keys) {
        const cartItem = JSON.parse(localStorage.getItem(key) || "");
        productsInCart.push(cartItem);
      }
    }

    const quantityCheck = products?.filter((product: Product) => {
      let returnValue = false;
      if (product.quantity == null) returnValue = true;
      if (productsInCart.length) {
        productsInCart.forEach((productInCart) => {
          if (productInCart.id === product.id) {
            if (productInCart.quantity >= product.quantity_In_Stock) {
                returnValue = false;
            }
          }
        });
      }
      return returnValue;
    });
    console.log(quantityCheck);
    const filteredProducts = quantityCheck?.filter(
      (product: Product) => product.category_Id === category
    );

    const selectedCategory: ProductCategory[] = categories?.filter(
      (p: ProductCategory) => p.id === category
    );

    let total = 0;
    for (let i = 0; i < filteredProducts.length; i++) {
      total += filteredProducts[i].price;
    }
    const spinTotal = (total + total * 0.1) / filteredProducts.length;

    this.setState({
      filteredProducts,
      selectedCategory: selectedCategory[0].category_Name,
      spinTotal: spinTotal,
    });
  };

  filterAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { filteredProducts } = this.state;
    const { products } = this.state;
    const keys = Object.keys(localStorage);
    const productsInCart: Product[] = [];
    if (localStorage.length) {
      for (const key of keys) {
        const cartItem = JSON.parse(localStorage.getItem(key) || "");
        productsInCart.push(cartItem);
      }
    }

    if (e.target.id === "all-products") {
      let total = 0;
      products.forEach((product: Product) => {
        total += product.price;
      });
      const spinTotal = (total + total * 0.1) / products.length;
      const quantityCheck = products?.filter((product: Product) => {
        if (productsInCart.length) {
          productsInCart.forEach((productInCart) => {
            if (productInCart.id === product.id) {
              if (productInCart.quantity < product.quantity_In_Stock) {
                return true;
              }
            }
          });
        }
        if (product.quantity == null) return true;
      });
      filteredProducts = quantityCheck;
      this.setState({
        filteredProducts,
        selectedCategory: "All Products",
        spinTotal: spinTotal,
      });
    }
  };

  handleCallback = (itemName: string): void => {
    if (this.state.isAllowed === false) {
      this.setState({
        isAllowed: true,
      });
    } else {
      this.setState({
        isAllowed: false,
        selectedItem: itemName,
      });
    }
  };

  render(): JSX.Element {
    const { categories, filteredProducts, isAllowed, selectedItem } =
      this.state;
    return (
      <>
        {isAllowed === true ? (
          <>
            <Wheel products={filteredProducts} callback={this.handleCallback} />
          </>
        ) : (
          <>
            <div className="spin-instructions-bar">
              Select the category you would like to spin! Price of spin is
              dynamically generated based on the products in the category.
            </div>
            <ProductCategoryBar
              categories={categories}
              filter={this.filterByCategory}
              all={this.filterAll}
            />
            {selectedItem.length > 0 && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>You won: {selectedItem}!</strong> Visit the cart page to
                check out!
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={() => this.setState({ selectedItem: "" })}
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
              category={this.state.selectedCategory}
            ></BuySpinModal>
          </>
        )}
      </>
    );
  }
}

export default Spin;
