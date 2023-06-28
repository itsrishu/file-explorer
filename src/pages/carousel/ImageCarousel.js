import React, { useState, useEffect } from "react";

const ImageCarousel = ({ images, interval = 3000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [images.length, interval]);

  const handleClick = (value) => {
    setCurrentImageIndex(value % images.length);
  };

  const handleNavigation = (direction) => {
    if (direction === "left") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <div
          onClick={handleNavigation.bind(null, "left")}
          className="mx-[24px] cursor-pointer"
        >
          &#8249;
        </div>
        <img
          src={images[currentImageIndex]}
          alt="Carousel Image"
          className="h-[500px] w-[100%]"
        />
        <div
          className="mx-[24px] cursor-pointer"
          onClick={handleNavigation.bind(null, "right")}
        >
          &#8250;
        </div>
      </div>

      <div className="flex justify-center items-center mt-[20px]">
        {images.map((image, index) => (
          <div
            className={`h-[24px] w-[24px] rounded-[50%] ${
              currentImageIndex === index ? "bg-gray-800" : "bg-gray-400"
            } mr-[8px] cursor-pointer`}
            onClick={handleClick.bind(null, index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
