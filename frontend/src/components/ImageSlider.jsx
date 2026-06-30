import React, { useState, useEffect } from "react";

function ImageSlider() {
  const images = [
    "./images/banner1.jpg",
    "./images/banner2.jpg",
    "./images/banner4.jpg",
    "./images/banner5.jpg",
    "./images/banner6.jpg",
    "./images/banner7.jpg",
    "./images/banner8.jpg",
    "./images/banner9.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-[16/10] lg:aspect-[16/4] overflow-hidden">
      {/* Images */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div className="w-full flex-shrink-0 h-full" key={index}>
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all
              ${index === currentIndex ? "bg-white scale-110" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
