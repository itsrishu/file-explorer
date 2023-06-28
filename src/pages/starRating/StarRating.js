import React, { useState } from "react";

const StarRating = ({ value, maxStars, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleRatingHover = (rating) => {
    setHoverValue(rating);
  };

  const handleClick = (rating) => {
    if (onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="star-rating-container flex">
      {[...Array(maxStars)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= (hoverValue || value);

        return (
          <span
            key={ratingValue}
            className={`text-2xl ${
              isFilled ? "text-yellow-500" : "text-gray-300"
            } cursor-pointer`}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => handleRatingHover(ratingValue)}
            onMouseLeave={() => handleRatingHover(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
