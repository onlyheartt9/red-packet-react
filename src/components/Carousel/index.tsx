import React, { useState } from 'react';
import './style.module.scss';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="prev-button">
        &lt;
      </button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      <button onClick={nextSlide} className="next-button">
        &gt;
      </button>
    </div>
  );
};

export default Carousel;