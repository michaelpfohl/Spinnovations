import React, { Component } from 'react';
import { ProductCard } from '../Components/Cards/ProductCard';
import HomeCarousel from '../Components/Carousel/HomeCarousel';
import productData from '../Helpers/Data/ProductData';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';

type HomeState = {
  products?: Product[],
}

class Home extends Component {
  
  state: HomeState = {
    products: []
  };

  componentDidMount(): void {
    productData.getLastTwentyProducts().then((response: Product[]) => {
      this.setState({
        products: response
      })
    })
  }

  render() : JSX.Element {
    const { products } = this.state;
    const productCard = (product: Product): JSX.Element => {
      return (<ProductCard product={product} />)
    };
    let cards = products?.map(productCard);
      return (
          <div>
              <HomeCarousel />
              <div className="d-flex flex-wrap">
                  {cards}
              </div>
          </div>
      )
  }
}

export default Home;
