import React, { useState } from "react";
import StarRating from "./StarRating";

const Star = () => {
  const [rating, setRating] = useState(3);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <h1>Star Rating Component</h1>
      <StarRating value={rating} maxStars={5} onChange={handleRatingChange} />
      <p>Selected Rating: {rating}</p>
    </div>
  );
};

export default Star;
