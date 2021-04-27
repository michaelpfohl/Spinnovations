import React, { Component } from 'react';
import HomeCarousel from '../Components/Carousel/HomeCarousel';

class Home extends Component {
  render() : JSX.Element {
    console.log("home is logging");
      return (
          <div>
              <HomeCarousel />
              <h1>Home Under Construction!</h1>
          </div>
      )
  }
}

export default Home;
