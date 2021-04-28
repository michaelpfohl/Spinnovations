import React, { Component } from 'react';
import Auth from '../Components/Auth';
import HomeCarousel from '../Components/Carousel/HomeCarousel';

class Home extends Component {
  render() : JSX.Element {
      return (
          <div>
              <Auth/>
              <HomeCarousel />
              <h1>Home Under Construction!</h1>
          </div>
      )
  }
}

export default Home;
