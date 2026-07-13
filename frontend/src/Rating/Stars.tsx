import { PiStar, PiStarFill, PiStarHalfFill } from "react-icons/pi";

type StarsProps = {
  rating: number;
  size?: number;
};

function Stars({ rating, size = 20 }: StarsProps) {
  const roundedRating = Math.round(rating * 2) / 2;
  return (
    <div
      className="flex justify-center gap-1 mb-2"
      aria-hidden="true"
      role="figure"
    >
      {Array.from({ length: 5 }).map((_, index) => {
        if (roundedRating >= index + 1) {
          return (
            <PiStarFill
              size={size}
              key={index}
              className="text-secondary text-xl"
              aria-hidden="true"
              focusable="false"
            />
          );
        }

        if (roundedRating >= index + 0.5) {
          return (
            <PiStarHalfFill
              size={size}
              key={index}
              className="text-secondary text-xl"
              aria-hidden="true"
              focusable="false"
            />
          );
        }

        return (
          <PiStar
            size={size}
            key={index}
            className="text-secondary text-xl"
            aria-hidden="true"
            focusable="false"
          />
        );
      })}
    </div>
  );
}

export default Stars;
