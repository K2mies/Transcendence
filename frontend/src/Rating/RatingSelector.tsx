import { useState } from "react";
import { PiStar, PiStarFill } from "react-icons/pi";

type RatingSelectorProps = {
  rating: number;
  setRating: (rating: number) => void;
  size?: number;
};

function RatingSelector({ rating, setRating, size = 20 }: RatingSelectorProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = hoverRating > 0 ? hoverRating : rating;
  return (
    <div
      className="flex justify-center gap-0 mb-4"
      onMouseLeave={() => setHoverRating(0)}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1;

        if (value <= displayRating) {
          return (
            <PiStarFill
              key={value}
              size={size}
              className="cursor-pointer text-secondary"
              onMouseEnter={() => setHoverRating(value)}
              onClick={() => setRating(value)}
            />
          );
        }

        return (
          <PiStar
            key={value}
            size={size}
            className="cursor-pointer text-secondary"
            onMouseEnter={() => setHoverRating(value)}
            onClick={() => setRating(value)}
          />
        );
      })}
    </div>
  );
}

export default RatingSelector;
