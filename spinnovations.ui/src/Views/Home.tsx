import React, { Component } from "react";
import { ProductCard } from "../Components/Cards/ProductCard";
import HomeCarousel from "../Components/Carousel/HomeCarousel";
import productData from "../Helpers/Data/ProductData";
import { Product } from "../Helpers/Interfaces/ProductInterfaces";

type HomeState = {
  products?: Product[];
};

class Home extends Component {
  state: HomeState = {
    products: [],
  };

  componentDidMount(): void {
    productData.getLastTwentyProducts().then((response: Product[]) => {
      this.setState({
        products: response,
      });
    });
  }

  render(): JSX.Element {
    const { products } = this.state;
    const productCard = (product: Product, color: number): JSX.Element => {
      return <ProductCard key={product.id} product={product} color={color} />;
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
        <HomeCarousel />
        <div className="d-flex flex-wrap">{cards}</div>
      </div>
    );
  }
}

export default Home;
