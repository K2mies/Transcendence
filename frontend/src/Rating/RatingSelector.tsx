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
    <fieldset
      className="flex justify-center gap-0 mb-4"
      onMouseLeave={() => setHoverRating(0)}
    >
      <legend className="sr-only">Rate this game</legend>

      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1;

        return (
          <label
            key={value}
            onMouseEnter={() => setHoverRating(value)}
            className="cursor-pointer"
          >
            <input
              type="radio"
              name="rating"
              value={value}
              checked={rating === value}
              onChange={() => setRating(value)}
              onFocus={() => setHoverRating(value)}
              onBlur={() => setHoverRating(0)}
              className="sr-only"
            />
            <span className="sr-only">{`${value} ${value === 1 ? "star" : "stars"}`}</span>
            {value <= displayRating ? (
              <PiStarFill
                aria-hidden="true"
                focusable="false"
                size={size}
                className="star text-secondary"
              />
            ) : (
              <PiStar
                aria-hidden="true"
                focusable="false"
                size={size}
                className="star text-secondary"
              />
            )}
          </label>
        );
      })}
    </fieldset>
  );
}

export default RatingSelector;
