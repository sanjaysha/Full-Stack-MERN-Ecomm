import React, { useState } from "react";
import { Star, StarHalf } from "lucide-react";

function Rating({ value, onRatingChange, disabled }) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value || 0);

  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoveredRating(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoveredRating(0);
    }
  };

  const handleClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);
      onRatingChange(rating);
    }
  };

  //   Generate an array of 5 stars
  const generateStars = () =>
    Array.from({ length: 5 }, (_, index) => {
      const ratingValue = index + 1;
      return (
        <Star
          fill={
            ratingValue <= (hoveredRating || selectedRating) ? "yellow" : "none"
          }
          strokeWidth={
            ratingValue <= (hoveredRating || selectedRating) ? "0" : "2"
          }
          key={index}
          className={`cursor-pointer transition-transform ${
            ratingValue <= (hoveredRating || selectedRating)
              ? "text-yellow-400"
              : "text-gray-300"
          } ${!disabled && "hover:scale-110"}`}
          onMouseEnter={() => handleMouseEnter(ratingValue)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(ratingValue)}
        />
      );
    });

  return <div className="flex">{generateStars()}</div>;
}

export default Rating;
