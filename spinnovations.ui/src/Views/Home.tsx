import React, { Component } from "react";
import { ProductCard } from "../Components/Cards/ProductCard";
import HomeCarousel from "../Components/Carousel/HomeCarousel";
import productData from "../Helpers/Data/ProductData";
import { Product } from "../Helpers/Interfaces/ProductInterfaces";

type HomeState = {
  products?: Product[];
  added: boolean;
  productName: string;
};

class Home extends Component {
  state: HomeState = {
    products: [],
    added: false,
    productName: "",
  };

  componentDidMount(): void {
    productData.getLastTwentyProducts().then((response: Product[]) => {
      this.setState({
        products: response,
      });
    });
  }

  cartAlert = (productName: string): void => {
    this.setState({ added: true, productName: productName });
    setTimeout(() => this.setState({ added: false }), 3000);
  };

  render(): JSX.Element {
    const { products, added, productName } = this.state;
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
    return (
      <div>
        {added && (
          <div
            className="alert alert-success alert-dismissible fade show mb-0"
            role="alert"
          >
            <strong>{productName} added to cart!</strong> Visit the cart page to
            check out!
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
        <HomeCarousel />
        <div className="d-flex flex-wrap">{cards}</div>
      </div>
    );
  }
}

export default Home;
