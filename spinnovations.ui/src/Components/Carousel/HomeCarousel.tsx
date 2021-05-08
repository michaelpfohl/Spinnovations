import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import { Link } from 'react-router-dom';

const items = [
    {
      src: 'https://images.pexels.com/photos/1599819/pexels-photo-1599819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      altText: 'Add Products Now',
      caption: 'Join our community of spinnovators and start adding products now.',
      link: '/products'
    },
    {
      src: 'https://images.pexels.com/photos/2527768/pexels-photo-2527768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      altText: 'Top Tech',
      caption: 'See our newest spinnovations, pushing the boundaries of current technology.',
      link: '/products'
    },
    {
      src: 'https://images.pexels.com/photos/776080/pexels-photo-776080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      altText: 'Trending Now',
      caption: 'View our most popular products. These spinnovations represent the very best of what we have to offer.',
      link: '/products'
    }
  ];
  
  const HomeCarousel = (): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex: number) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <Link to={item.link}>
            <CarouselCaption captionHeader={item.altText} captionText={item.caption} />
          </Link>
        </CarouselItem>
      );
    });
  
    return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        className="mb-4"
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
  }

  export default HomeCarousel;