import React from "react";

import productData from "../Helpers/Data/ProductData";
import productCategoryData from "../Helpers/Data/ProductCategoryData";
import { Product } from "../Helpers/Interfaces/ProductInterfaces";
import { ProductCard } from "../Components/Cards/ProductCard";
import { ProductCategory } from "../Helpers/Interfaces/ProductCategoryInterfaces";
import { ProductCategoryBar } from "../Components/ProductCategoryBar";

type ProductsState = {
  products?: Product[];
  filteredProducts?: Product[];
  categories?: ProductCategory[];
  added?: boolean;
  productName?: string,
};

class Products extends React.Component<ProductsState> {
  state: ProductsState = {
    products: [],
    filteredProducts: [],
    categories: [],
    added: false,
    productName: "",
  };

  componentDidMount(): void {
    productCategoryData
      .getProductCategories()
      .then((response: ProductCategory[]) => {
        this.setState({
          categories: response,
        });
      });
    productData.getProducts().then((response: Product[]) => {
      this.setState({
        products: response,
        filteredProducts: response,
      });
    });
  }

  filterByCategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const category = e.target.id;
    const { products } = this.state;
    const filteredProducts = products?.filter(
      (product) => product.category_Id == category
    );
    this.setState({ filteredProducts });
  };

  filterAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { filteredProducts } = this.state;
    const { products } = this.state;
    if (e.target.id == "all-products") {
      filteredProducts = products;
      this.setState({ filteredProducts });
    }
  };

  cartAlert = (productName: string): void => {
    this.setState({ added: true, productName: productName });
    setTimeout(() => this.setState({ added: false }), 3000);
  };

  render(): JSX.Element {
    const { products, filteredProducts, categories, added, productName } = this.state;
    const productCard = (product: Product, color: number): JSX.Element => {
      return <ProductCard key={product.id} product={product} color={color} cartAlert={this.cartAlert}/>;
    };
    const assignColors = (products: Product[]) => {
      const cards: Product[] = [];
      let counter = 0;
      products?.forEach((product) => {
        counter++;
        if (counter >= 8) counter = 1;
        cards.push(productCard(product, counter));
      });
      return cards;
    };
    let cards: Product[] = [];
    if (products?.length) {
      cards = assignColors(products);
    }

    if (filteredProducts !== products) {
      if (!filteredProducts?.length) {
        cards = [<h1>No Products Currently In Category!</h1>];
      } else {
        cards = assignColors(filteredProducts);
      }
    } else {
      if (products?.length) {
        cards = assignColors(products);
      }
    }
    return (
      <div>
        <ProductCategoryBar
          categories={categories}
          filter={this.filterByCategory}
          all={this.filterAll}
        />
        {added && (
          <div
            className="alert alert-success alert-dismissible fade show mb-5"
            role="alert"
          >
            <strong>{productName} added to cart!</strong> Visit the cart page to check out!
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => this.setState({ added: false })}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="container-fluid d-flex flex-wrap justify-content-around mt-5">
          {cards}
        </div>
      </div>
    );
  }
}

export default Products;
